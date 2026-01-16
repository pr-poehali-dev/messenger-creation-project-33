import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

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

type ChatListProps = {
  activeTab: 'chats' | 'channels' | 'groups';
  onTabChange: (tab: 'chats' | 'channels' | 'groups') => void;
  chats: ChatType[];
  channels: ChatType[];
  groups: ChatType[];
  selectedChat: ChatType | null;
  onChatSelect: (chat: ChatType) => void;
};

export default function ChatList({
  activeTab,
  onTabChange,
  chats,
  channels,
  groups,
  selectedChat,
  onChatSelect,
}: ChatListProps) {
  const getCurrentList = () => {
    if (activeTab === 'chats') return chats;
    if (activeTab === 'channels') return channels;
    return groups;
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Сообщения</h2>
        <Input 
          placeholder="Поиск..." 
          className="bg-background"
        />
      </div>

      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as any)} className="flex-1 flex flex-col">
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
                  onClick={() => onChatSelect(chat)}
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
  );
}
