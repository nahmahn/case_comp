import { useState } from 'react';
import Layout from './Layout';
import { Step1Fragmentation } from './components/Step1Fragmentation';
import { Step2Intervention } from './components/Step2Intervention';
import { Step3Insight } from './components/Step3Insight';
import { Step4Decision } from './components/Step4Decision';
import { Step5Outcome } from './components/Step5Outcome';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1Fragmentation key="step1" />;
      case 1: return <Step2Intervention key="step2" />;
      case 2: return <Step3Insight key="step3" />;
      case 3: return <Step4Decision key="step4" />;
      case 4: return <Step5Outcome key="step5" />;
      default: return <Step1Fragmentation key="step1" />;
    }
  };

  return (
    <Layout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={nextStep}
      onSetStep={setCurrentStep}
    >
      {renderStep()}
    </Layout>
  );
}

export default App;
