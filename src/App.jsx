import { useState } from 'react';

import ChordBuilderScreen from './screens/ChordBuilder.screen';
import ScaleBuilderScreen from './screens/ScaleBuilder.screen';
import CircleExplorerScreen from './screens/CircleExplorer.screen';
import DiatonicAnalysisScreen from './screens/DiatonicAnalysis.screen';
import Menu from './components/Menu.component';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('screen-lookup');
  
  // Shared Root state for builders and the Circle Explorer
  const [selectedRoot, setSelectedRoot] = useState('C'); 
  
  // Chord Builder States (Screen 1)
  const [selectedQuality, setSelectedQuality] = useState('maj'); 
  const [selectedChord, setSelectedChord] = useState(null); 

  // Scale Builder States (Screen 3 - NEW)
  const [selectedScaleType, setSelectedScaleType] = useState('major');
  const [selectedScale, setSelectedScale] = useState(null); 

  // Diatonic Analysis State (Screen 2)
  const [selectedKey, setSelectedKey] = useState({ root: 'C', mode: 'ionian' }); 

  const handleScreenChange = (screenId) => {
    setActiveScreen(screenId);
    setSelectedChord(null);
    setSelectedScale(null);
  };
  
  return (
    <>
      <div className="bg-dark-bg text-gray-100 min-h-screen p-4 font-sans">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-8 mb-8 text-center">Jimbo's Chord-O-Matic</h1>

          <Menu
            activeScreen={activeScreen}
            handleScreenChange={handleScreenChange}
          />

          <div className="grid grid-cols-1 gap-6">
            {activeScreen === 'screen-lookup' && (
              <ChordBuilderScreen
                selectedRoot={selectedRoot}
                setSelectedRoot={setSelectedRoot}
                selectedQuality={selectedQuality}
                setSelectedQuality={setSelectedQuality}
                selectedChord={selectedChord}
                setSelectedChord={setSelectedChord}
              />
            )}

            {activeScreen === 'screen-diatonic' && (
              <DiatonicAnalysisScreen
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
              />
            )}

            {activeScreen === 'screen-scale' && (
              <ScaleBuilderScreen
                selectedRoot={selectedRoot}
                setSelectedRoot={setSelectedRoot}
                selectedScaleType={selectedScaleType}
                setSelectedScaleType={setSelectedScaleType}
                selectedScale={selectedScale}
                setSelectedScale={setSelectedScale}
              />
            )}
            
            {activeScreen === 'screen-circle' && (
              <CircleExplorerScreen
                selectedRoot={selectedRoot}
                setSelectedRoot={setSelectedRoot}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}