import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type SidebarProps = {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onCreateClick: () => void;
};

export default function Sidebar({ onProfileClick, onSettingsClick, onCreateClick }: SidebarProps) {
  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-4 space-y-6">
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-xl"
        onClick={onProfileClick}
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
          onClick={onCreateClick}
        >
          <Icon name="PlusCircle" size={24} />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-xl hover:bg-accent"
        onClick={onSettingsClick}
      >
        <Icon name="Settings" size={24} />
      </Button>
    </div>
  );
}
