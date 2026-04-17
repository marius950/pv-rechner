'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFunnelStore } from '@/store/funnel';
import Logo from './ui/Logo';
import ThemeToggle from './ui/ThemeToggle';
import ProgressBar from './ui/ProgressBar';
import Step0Landing from './steps/Step0Landing';
import Step1Haustyp from './steps/Step1Haustyp';
import Step2Dach from './steps/Step2Dach';
import Step3Flaeche from './steps/Step3Flaeche';
import Step4Persons from './steps/Step4Persons';
import Step5Speicher from './steps/Step5Speicher';
import Step6Lead from './steps/Step6Lead';
import StepResult from './steps/StepResult';
import RightPanel from './viz/RightPanel';

const stepVariants = {
  enter:  { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -20 },
};

export default function PVFunnel() {
  const { step, theme } = useFunnelStore();

  // Apply theme class to html element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const isLanding = step === 0;

  return (
    <div className="page">
      {/* ── LEFT PANEL ── */}
      <div className="left-panel">
        {/* Sticky header */}
        <div className="effi-logo">
          <Logo />
          <div className="effi-logo-sep" />
          <span className="effi-logo-service">PV-Rechner</span>
          <ThemeToggle />
        </div>

        {/* Progress bar (hidden on landing) */}
        {!isLanding && step !== 'result' && (
          <ProgressBar currentStep={typeof step === 'number' ? step - 1 : 5} />
        )}

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={String(step)}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {step === 0         && <Step0Landing />}
            {step === 1         && <Step1Haustyp />}
            {step === 2         && <Step2Dach />}
            {step === 3         && <Step3Flaeche />}
            {step === 4         && <Step4Persons />}
            {step === 5         && <Step5Speicher />}
            {step === 6         && <Step6Lead />}
            {step === 'result'  && <StepResult />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="right-panel">
        <RightPanel />
      </div>
    </div>
  );
}
