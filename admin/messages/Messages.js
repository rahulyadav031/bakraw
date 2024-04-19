import React from 'react'
import cookieCutter from "cookie-cutter"
import MessageCard from './MessageCard';
import EmptyCart from '@/components/cart/EmptyCart';
import ResponsiveTable from '../Common/ResponsiveTable';

function Messages() {
  const [messages, setMessages] = React.useState([]);
  const [search, setSearch] = React.useState('');

  function fetchMessages() {
    fetch('/api/getmessages', {
      method: "GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${cookieCutter.get('atkn')}`
      },
    })
      .then(res => res.json())
      .then(data => setMessages(data.data))
      .catch(err => console.log(err))
  }
  React.useEffect(() => {
    fetchMessages();
    setInterval(() => {
      fetchMessages();
      console.log(messages)
    }, 60 * 60 * 1000)
  }, [])

  return (
    <div className='min-h-screen w-full flex flex-col justify-start items-start text-black'>
      <div className='sticky top-2 my-2 mx-2'>
        <input className='w-full max-w-[300px] outline-none p-2 border-[1px] border-green-300 rounded-md tracking-wide font-medium' placeholder='Search Messages' onChange={(e) => setSearch(e.target.value)} />
      </div>
      {
        messages.length === 0 ? <EmptyCart text="No Messages" /> : (search !== '' ? messages
          .filter(message => (message.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || message.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || message.date.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || message.number.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || message.message.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
          .map(
            (message, index) => (
              <MessageCard key={`index${message.number}`} name={message.name} number={message.number} email={message.email} message={message.message} date={message.date} />
            )
          ) : messages.map(
            (message, index) => (
              <MessageCard key={`index${message.number}`} name={message.name} number={message.number} email={message.email} message={message.message} date={message.date} />
            )
          ))
      }
    </div>
  )
}

export default Messages