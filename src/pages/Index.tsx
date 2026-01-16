import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

  const getCurrentList = () => {
    if (activeTab === 'chats') return chats;
    if (activeTab === 'channels') return channels;
    return groups;
  };

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

  const handleCreateNew = () => {
    setShowCreateDialog(true);
  };

  const emojis = ['😊', '👍', '❤️', '😂', '🔥', '👏', '🎉', '💯'];
  const stickers = ['🐶', '🐱', '🐼', '🦊', '🦁', '🐯', '🐸', '🐵'];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-background text-foreground">
        <div className="w-20 bg-card border-r border-border flex flex-col items-center py-4 space-y-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl"
            onClick={() => setShowProfile(true)}
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">ИИ</AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex-1 flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl hover:bg-accent"
            >
              <Icon name="MessageSquare" size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl hover:bg-accent"
            >
              <Icon name="Users" size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl hover:bg-accent"
              onClick={handleCreateNew}
            >
              <Icon name="PlusCircle" size={24} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-accent"
            onClick={() => setShowSettings(true)}
          >
            <Icon name="Settings" size={24} />
          </Button>
        </div>

        <div className="w-80 bg-card border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-2xl font-bold mb-4">Сообщения</h2>
            <Input 
              placeholder="Поиск..." 
              className="bg-background"
            />
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger value="chats" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Чаты
              </TabsTrigger>
              <TabsTrigger value="channels" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Каналы
              </TabsTrigger>
              <TabsTrigger value="groups" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Группы
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {['chats', 'channels', 'groups'].map((tab) => (
                <TabsContent key={tab} value={tab} className="m-0">
                  {getCurrentList().map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">{chat.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold truncate">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">{selectedChat.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedChat.name}</h2>
                    <p className="text-xs text-muted-foreground">онлайн</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="Search" size={20} />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2 rounded-2xl ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Icon name="Smile" size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="grid grid-cols-4 gap-2">
                        {emojis.map((emoji, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="text-2xl h-12"
                            onClick={() => setMessageInput(messageInput + emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Icon name="Sticker" size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="grid grid-cols-4 gap-2">
                        {stickers.map((sticker, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="text-3xl h-12"
                            onClick={() => setMessageInput(messageInput + sticker)}
                          >
                            {sticker}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Input
                    placeholder="Написать сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  
                  <Button 
                    size="icon" 
                    className="rounded-full"
                    onClick={handleSendMessage}
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg">Выберите чат, чтобы начать общение</p>
              </div>
            </div>
          )}
        </div>

        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Профиль</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">ИИ</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{userName}</h3>
                <p className="text-sm text-muted-foreground">{userBio}</p>
                <p className="text-sm text-muted-foreground mt-2">{userPhone}</p>
              </div>
              <Button className="w-full" onClick={() => {
                setShowProfile(false);
                setShowEditProfile(true);
              }}>
                Редактировать профиль
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать профиль</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => setShowEditProfile(false)}>
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Настройки</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Темная тема</Label>
                  <p className="text-sm text-muted-foreground">Включить темное оформление</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать push-уведомления</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setShowSettings(false);
                  setShowBlacklist(true);
                }}
              >
                Черный список
              </Button>
              <Button variant="destructive" className="w-full">
                Выйти
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать новый {activeTab === 'chats' ? 'чат' : activeTab === 'channels' ? 'канал' : 'группу'}</DialogTitle>
              <DialogDescription>
                Введите данные для создания
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-name">Название</Label>
                <Input
                  id="new-name"
                  placeholder={`Название ${activeTab === 'chats' ? 'чата' : activeTab === 'channels' ? 'канала' : 'группы'}`}
                />
              </div>
              {activeTab !== 'chats' && (
                <div>
                  <Label htmlFor="new-description">Описание</Label>
                  <Textarea
                    id="new-description"
                    placeholder="Описание"
                  />
                </div>
              )}
              <Button className="w-full" onClick={() => setShowCreateDialog(false)}>
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showBlacklist} onOpenChange={setShowBlacklist}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Черный список</DialogTitle>
              <DialogDescription>
                Заблокированные пользователи
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center py-8">
                  Список пуст
                </p>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
