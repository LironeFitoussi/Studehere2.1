import React from 'react';
import { useTranslation } from 'react-i18next';

interface Benefit {
  icon: React.ElementType;
  text: string;
}

interface BenefitsProps {
  benefits: Benefit[];
}

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  const { t } = useTranslation();
  return (
    <section className="container mx-auto py-20">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">{t("home.benefitsTitle", "Why Choose Our System?")}</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <benefit.icon className="text-primary" />
                <span>{t(`home.benefits.${idx}.text`, benefit.text)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-lg bg-muted/30 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg" />
          <div className="relative">
            <h3 className="mb-4 text-2xl font-bold">{t("home.modernTechTitle", "Modern, Secure, and Reliable")}</h3>
            <p className="text-muted-foreground">
              {t("home.modernTechDesc", "Our platform leverages the latest technology to ensure your academic data is safe, accessible, and always up to date.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits; 