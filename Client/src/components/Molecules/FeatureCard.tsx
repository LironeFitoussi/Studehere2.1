import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { CheckCircle } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, details }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
    <CardHeader>
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            {detail}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default FeatureCard; 