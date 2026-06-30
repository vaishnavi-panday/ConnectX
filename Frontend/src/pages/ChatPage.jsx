import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import  {getSocket}  from "../socket/socket";
import { Paperclip, Image } from "lucide-react";
const ChatPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [isTyping, setisTyping] = useState(false)
  const [text, setText] = useState("");
  const [openMenu, setOpenMenu] = useState(null)
  const [replyMessage , setReplyMessage] = useState(null);
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const typingTimeout = useRef(null);
  const emojis = ["❤️", "😂", "👍", "🔥", "😢", "😮"];
  
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/message/${id}/chat`,
        {
          withCredentials: true,
        }
      );
      setMessages(res.data.messages);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchReceiver = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/${id}/user`,
        {
          withCredentials: true,
        }
      );

      setReceiver(res.data.details);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    

    if (!text.trim() && !image && !file) return;

    try {
      const formData = new FormData();

formData.append("text", text);

if(image){
    formData.append("image", image);
}

if(replyMessage){
    formData.append("replyTo", replyMessage._id);
}
if(file){
    formData.append("file", file);
}
console.log(file)
 await axios.post(
    `http://localhost:3000/api/message/${id}/chat`,
    formData,
    {
        withCredentials: true
    }
);

      setText("");
      setReplyMessage(null)
      setImage(null)
      setFile(null)
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (messageId) => {
    try {

        await axios.delete(
            `http://localhost:3000/api/message/${messageId}`,
            {
                withCredentials: true,
            }
        );

        setMessages((prev) =>
            prev.filter((msg) => msg._id !== messageId)
        );

    } catch (error) {
        console.log(error);
    }
};
const handleDeleteForMe = async(messageId)=>{
    try{
    await axios.patch(`http://localhost:3000/api/message/${messageId}`,{},{
        withCredentials:true
    })
    setMessages((prev)=>{
        return prev.filter((msg)=> msg._id!==messageId)
    })
}catch(error){
    console.log(error)
}}
const handleReaction = async (messageId, emoji) => {
    try {

        const res = await axios.patch(
            `http://localhost:3000/api/message/${messageId}/react`,
            {
                reaction: emoji
            },
            {
                withCredentials: true
            }
        );

        setMessages(prev =>
            prev.map(msg =>
                msg._id === messageId
                    ? {
                        ...msg,
                        reactions: res.data.reactions
                    }
                    : msg
            )
        );

    } catch (error) {
        console.log(error);
    }
};
  
useEffect(() => {

    const loadChat = async () => {

        await fetchReceiver();
        await fetchMessages();

        await axios.patch(
            `http://localhost:3000/api/message/seen/${id}`,
            {},
            {
                withCredentials: true
            }
        );

    }

    loadChat();

}, [id]);
useEffect(() => {

   const socket = getSocket();

   if(!socket) return;

   socket.on("newMessage", (newMessage) => {

      setMessages((prev) => [
         ...prev,
         newMessage
      ]);

   });
   socket.on('typing',()=>{
    setisTyping(true);
   })
   socket.on("stoptyping", () => {
    setisTyping(false);
});
   socket.on('messageseen' ,async ()=>{
    fetchMessages()
    
   })
   socket.on('deleteForEveryone',  (deletedMessageId) => {

    setMessages((prev)=>
        prev.filter(msg=>msg._id !== deletedMessageId)
    );
    

})
socket.on("reactionUpdated", (data) => {

    setMessages(prev =>
        prev.map(msg =>
            msg._id === data.messageId
                ? {
                    ...msg,
                    reactions: data.reactions
                }
                : msg
        )
    );

});

   return () => {
      socket.off("newMessage");
      socket.off("typing");
      socket.off("stoptyping")
      socket.off("messageseen")
      socket.off('deleteForEveryone')
      socket.off('reactionUpdated')
   };

}, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-white to-[#FFE5D8]">

    <Navbar />

    <div className="max-w-4xl mx-auto mt-6 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-[#FFE5D8]">

      
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#FFE5D8] p-4 flex items-center gap-4">

        <img
          src={receiver?.profilepic}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7F66]"
        />

        <div className="flex-1">
          <h2 className="font-bold text-gray-800">
            {receiver?.username}
          </h2>

          {isTyping && (
            <p className="text-xs text-[#FF7F66] animate-pulse">
              typing...
            </p>
          )}
        </div>

        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

      </div>

      
      <div className="h-[550px] overflow-y-auto p-5 space-y-3 flex flex-col">

        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            Start your conversation ✨
          </div>
        ) : (
          messages.map((msg, index) => {

            const isMe = msg.sender === user.id;

            return (
              <div
                key={msg._id}
                className={`relative max-w-[75%] group transition-all duration-300 ${
                  isMe ? "self-end" : "self-start"
                }`}
              >

                
                <div
                  className={`px-4 py-3 rounded-3xl shadow-sm transition-all duration-200
                  ${isMe
                    ? "bg-[#FF7F66] text-white rounded-br-md"
                    : "bg-white border border-[#FFE5D8] text-gray-800 rounded-bl-md"
                  }`}
                >

                 
                  {msg.replyTo && (
                    <div className="text-xs bg-black/10 rounded-xl p-2 mb-2 opacity-80">
                      ↪ {msg.replyTo.text}
                    </div>
                  )}

                 
                  {msg.image && (
                    <img
                      src={msg.image}
                      className="rounded-2xl max-w-[220px] mb-2"
                    />
                  )}

                  
                  {msg.file && (
                    <a
                      href={msg.file}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-white/10 border rounded-xl p-2 mb-2"
                    >
                      📄 {msg.fileName}
                    </a>
                  )}

                 
                  <p className="text-sm leading-relaxed">
                    {msg.text}
                  </p>
                  <div className="text-[10px] text-gray-300 mt-1 text-right">
  {new Date(msg.createdAt).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</div>

                </div>

                
                {msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1 px-2">
                    {msg.reactions.map((r) => (
                      <span
                        key={r._id}
                        className="text-sm bg-white border border-[#FFE5D8] px-2 py-1 rounded-full shadow-sm"
                      >
                        {r.emoji}
                      </span>
                    ))}
                  </div>
                )}

              
                {isMe && index === messages.length - 1 && (
                  <p className="text-[10px] text-gray-400 mt-1 text-right">
                    {msg.seen ? "Seen ✓✓" : "Sent ✓"}
                  </p>
                )}

                
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === msg._id ? null : msg._id)
                  }
                  className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition text-gray-500"
                  style={{
                    right: isMe ? "100%" : "auto",
                    left: isMe ? "auto" : "100%",
                    margin: "0 8px",
                  }}
                >
                  ⋮
                </button>

               
                {openMenu === msg._id && (
                  <div
                    className={`absolute z-50 mt-2 w-44 bg-white border border-[#FFE5D8] rounded-2xl shadow-xl overflow-hidden
                    ${isMe ? "right-0" : "left-0"}`}
                  >

                    <button
                      onClick={() => handleDeleteForMe(msg._id)}
                      className="w-full text-left px-4 py-2 hover:bg-[#FFF5EF]"
                    >
                      Delete for me
                    </button>

                    {isMe && (
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                      >
                        Delete for everyone
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setReplyMessage(msg);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#FFF5EF]"
                    >
                      Reply
                    </button>

                  </div>
                )}

                
                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(msg._id, emoji)}
                      className="text-sm hover:scale-110 transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

              </div>
            );
          })
        )}

      </div>

      
      {replyMessage && (
        <div className="bg-[#FFF5EF] border-l-4 border-[#FF7F66] px-4 py-2 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Replying to</p>
            <p className="text-sm text-gray-700">
              {replyMessage.text}
            </p>
          </div>

          <button
            onClick={() => setReplyMessage(null)}
            className="text-[#FF7F66]"
          >
            ✕
          </button>
        </div>
      )}
{(image || file) && (
  <div className="mb-2 bg-[#FFF5EF] border border-[#FFE5D8] p-3 rounded-2xl flex items-center justify-between gap-4">

    
    <div className="flex items-center gap-3">

      
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="w-14 h-14 object-cover rounded-xl border border-[#FFE5D8]"
        />
      )}

      
      {file && (
        <div className="w-14 h-14 flex items-center justify-center bg-white border border-[#FFE5D8] rounded-xl text-xl">
          📄
        </div>
      )}

      
      <div className="text-sm">
        <p className="font-medium text-gray-700">
          {image ? "Image ready to send" : file?.name}
        </p>

        {file && (
          <p className="text-xs text-gray-400">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        )}
      </div>

    </div>

    
    <button
      onClick={() => {
        setImage(null);
        setFile(null);
      }}
      className="text-red-400 hover:text-red-500 text-lg font-bold"
    >
      ✕
    </button>

  </div>
)}



     
      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-[#FFE5D8] flex items-center gap-3"
      >

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const socket = getSocket();

            socket.emit("typing", id);

            clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => {
              socket.emit("stoptyping", id);
            }, 800);
          }}
          className="flex-1 bg-[#FFF8EE] border border-[#FFE5D8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-[#FF7F66]"
        />

        <div className="flex items-center gap-2">

  
  <label className="cursor-pointer p-3 rounded-full bg-[#FFF5EF] hover:bg-[#FFE5D8] transition border border-[#FFE5D8]">
    <Image size={18} className="text-[#FF7F66]" />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files[0];
        if (!f) return;

        setImage(f);
        setFile(null);
      }}
    />
  </label>

 
  <label className="cursor-pointer p-3 rounded-full bg-[#FFF5EF] hover:bg-[#FFE5D8] transition border border-[#FFE5D8]">
    <Paperclip size={18} className="text-[#FF7F66]" />
    <input
      type="file"
      accept=".pdf,.doc,.docx,.zip"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files[0];
        if (!f) return;

        setFile(f);
        setImage(null);
      }}
    />
  </label>

</div>

        <button
          type="submit"
          className="bg-[#FF7F66] hover:bg-[#ff6c4d] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          Send
        </button>

      </form>

    </div>
  </div>
);
};

export default ChatPage;