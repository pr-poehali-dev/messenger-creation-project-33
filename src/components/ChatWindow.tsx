import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

type ChatWindowProps = {
  selectedChat: ChatType | null;
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
};

export default function ChatWindow({
  selectedChat,
  messageInput,
  onMessageInputChange,
  onSendMessage,
}: ChatWindowProps) {
  const emojis = ['😊', '👍', '❤️', '😂', '🔥', '👏', '🎉', '💯'];
  const stickers = ['🐶', '🐱', '🐼', '🦊', '🦁', '🐯', '🐸', '🐵'];

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg">Выберите чат, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
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
                    onClick={() => onMessageInputChange(messageInput + emoji)}
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
                    onClick={() => onMessageInputChange(messageInput + sticker)}
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
            onChange={(e) => onMessageInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1"
          />
          
          <Button 
            size="icon" 
            className="rounded-full"
            onClick={onSendMessage}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
