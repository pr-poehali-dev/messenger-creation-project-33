import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import DialogsManager from '@/components/DialogsManager';

type MessageType = {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  type?: 'text' | 'image' | 'sticker' | 'emoji';
};

type ChatType = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'chat' | 'channel' | 'group';
  messages: MessageType[];
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<'chats' | 'channels' | 'groups'>('chats');
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [messageInput, setMessageInput] = useState('');
  
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showBlacklist, setShowBlacklist] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState('Иван Иванов');
  const [userBio, setUserBio] = useState('Здесь будет ваш статус');
  const [userPhone, setUserPhone] = useState('+7 900 123 45 67');

  const [chats, setChats] = useState<ChatType[]>([
    {
      id: 1,
      name: 'Алексей Смирнов',
      avatar: 'AS',
      lastMessage: 'Привет! Как дела?',
      time: '14:23',
      unread: 2,
      type: 'chat',
      messages: [
        { id: 1, text: 'Привет!', time: '14:20', isOwn: false },
        { id: 2, text: 'Привет! Как дела?', time: '14:23', isOwn: false },
      ]
    },
    {
      id: 2,
      name: 'Мария Петрова',
      avatar: 'МП',
      lastMessage: 'Отправлю файлы позже',
      time: '13:45',
      unread: 0,
      type: 'chat',
      messages: [
        { id: 1, text: 'Нужны те документы', time: '13:40', isOwn: true },
        { id: 2, text: 'Отправлю файлы позже', time: '13:45', isOwn: false },
      ]
    },
  ]);

  const [channels] = useState<ChatType[]>([
    {
      id: 3,
      name: 'Новости технологий',
      avatar: 'НТ',
      lastMessage: 'Новый релиз React 19',
      time: '12:30',
      unread: 5,
      type: 'channel',
      messages: [
        { id: 1, text: 'Новый релиз React 19 уже доступен!', time: '12:30', isOwn: false },
      ]
    },
  ]);

  const [groups] = useState<ChatType[]>([
    {
      id: 4,
      name: 'Рабочая группа',
      avatar: 'РГ',
      lastMessage: 'Встреча в 15:00',
      time: '11:00',
      unread: 3,
      type: 'group',
      messages: [
        { id: 1, text: 'Всем привет!', time: '10:50', isOwn: false },
        { id: 2, text: 'Встреча в 15:00', time: '11:00', isOwn: false },
      ]
    },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: MessageType = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    if (selectedChat.type === 'chat') {
      setChats(chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ));
    }

    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage]
    });

    setMessageInput('');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar
          onProfileClick={() => setShowProfile(true)}
          onSettingsClick={() => setShowSettings(true)}
          onCreateClick={() => setShowCreateDialog(true)}
        />

        <ChatList
          activeTab={activeTab}
          onTabChange={setActiveTab}
          chats={chats}
          channels={channels}
          groups={groups}
          selectedChat={selectedChat}
          onChatSelect={setSelectedChat}
        />

        <ChatWindow
          selectedChat={selectedChat}
          messageInput={messageInput}
          onMessageInputChange={setMessageInput}
          onSendMessage={handleSendMessage}
        />

        <DialogsManager
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          showEditProfile={showEditProfile}
          setShowEditProfile={setShowEditProfile}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          showCreateDialog={showCreateDialog}
          setShowCreateDialog={setShowCreateDialog}
          showBlacklist={showBlacklist}
          setShowBlacklist={setShowBlacklist}
          userName={userName}
          setUserName={setUserName}
          userBio={userBio}
          setUserBio={setUserBio}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
