import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Archive, DollarSign, AlertCircle, Truck } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Ukupno artikala',
      value: '1,254',
      icon: <Archive className="h-6 w-6 text-gray-500" />,
      description: '+2% u odnosu na prošli mesec',
    },
    {
      title: 'Vrednost zaliha',
      value: '12,850,320.50 RSD',
      icon: <DollarSign className="h-6 w-6 text-gray-500" />,
      description: 'Ukupna vrednost svih artikala',
    },
    {
      title: 'Artikli na minimumu',
      value: '42',
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
      description: 'Potrebno je naručiti',
    },
    {
      title: 'Porudžbine za slanje',
      value: '18',
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      description: 'Čekaju na otpremu',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Ovde će u budućnosti doći grafikoni i dodatne analize */}
    </div>
  );
};

export default DashboardPage;
