import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

type DialogsManagerProps = {
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  showEditProfile: boolean;
  setShowEditProfile: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showCreateDialog: boolean;
  setShowCreateDialog: (show: boolean) => void;
  showBlacklist: boolean;
  setShowBlacklist: (show: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
  userBio: string;
  setUserBio: (bio: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  activeTab: 'chats' | 'channels' | 'groups';
};

export default function DialogsManager({
  showProfile,
  setShowProfile,
  showEditProfile,
  setShowEditProfile,
  showSettings,
  setShowSettings,
  showCreateDialog,
  setShowCreateDialog,
  showBlacklist,
  setShowBlacklist,
  userName,
  setUserName,
  userBio,
  setUserBio,
  userPhone,
  setUserPhone,
  darkMode,
  setDarkMode,
  activeTab,
}: DialogsManagerProps) {
  return (
    <>
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
    </>
  );
}
