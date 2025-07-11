import React from 'react';
import FeatureCard from '../Molecules/FeatureCard';
import { useTranslation } from 'react-i18next';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('home.featuresTitle', 'Key Features')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 