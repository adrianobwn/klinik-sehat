import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck, Calendar, AlertCircle, Info } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      icon: Calendar,
      title: 'Appointment Reminder',
      message: 'Anda memiliki janji dengan Dr. Ahmad besok pukul 10:00',
      time: '2 jam yang lalu',
      read: false
    },
    {
      id: 2,
      type: 'info',
      icon: Info,
      title: 'System Update',
      message: 'Sistem akan maintenance pada hari Minggu, 24:00 - 02:00',
      time: '5 jam yang lalu',
      read: false
    },
    {
      id: 3,
      type: 'success',
      icon: CheckCheck,
      title: 'Appointment Confirmed',
      message: 'Janji temu Anda telah dikonfirmasi',
      time: '1 hari yang lalu',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      title: 'Queue Update',
      message: 'Nomor antrian Anda: 15. Saat ini dilayani: nomor 12',
      time: '2 hari yang lalu',
      read: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-500/10 text-blue-500';
      case 'success':
        return 'bg-green-500/10 text-green-500';
      case 'alert':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifikasi</h1>
            <p className="text-muted-foreground">Semua update dan pengingat Anda</p>
          </div>
          <Button variant="outline" size="sm">
            <CheckCheck className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum Ada Notifikasi</h3>
                <p className="text-sm text-muted-foreground">
                  Notifikasi Anda akan muncul di sini
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
