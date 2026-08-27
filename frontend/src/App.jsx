import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([
    { sender: 'saheli', text: 'Hi! I am Saheli, your business mentor. How can I help you today?' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.trim() === '') return
    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-amber-500 to-teal-600 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-6 bg-rose-700 px-6 py-2.5 rounded-lg shadow-lg tracking-wide">
        💼 Saheli AI
      </h1>

      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-5 flex flex-col gap-3 shadow-2xl">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {msg.sender === 'saheli' && (
              <div className="w-7 h-7 shrink-0 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
            )}
            <div
              className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-teal-500 text-white rounded-br-sm'
                  : 'bg-amber-400 text-neutral-900 rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-white outline-none placeholder-neutral-500 text-sm focus:border-rose-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-rose-700 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App