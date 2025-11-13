const Menu = ({ activeScreen, handleScreenChange }) => {
    return (
        <div className="mb-6 grid grid-cols-2 gap-3 justify-center max-w-3xl mx-auto sm:grid-cols-4">
            <button
              onClick={() => handleScreenChange('screen-lookup')}
              className={`p-3 w-full rounded-lg text-white text-lg font-semibold shadow-lg transition duration-200 ${
                activeScreen === 'screen-lookup'
                  ? 'bg-primary hover:bg-indigo-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Chord Builder
            </button>
            <button
              onClick={() => handleScreenChange('screen-diatonic')}
              className={`p-3 w-full rounded-lg text-white text-lg font-semibold shadow-lg transition duration-200 ${
                activeScreen === 'screen-diatonic'
                  ? 'bg-primary hover:bg-indigo-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Diatonic Analysis
            </button>
            <button
              onClick={() => handleScreenChange('screen-scale')}
              className={`p-3 w-full rounded-lg text-white text-lg font-semibold shadow-lg transition duration-200 ${
                activeScreen === 'screen-scale'
                  ? 'bg-primary hover:bg-indigo-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Scale Builder
            </button>
            <button
              onClick={() => handleScreenChange('screen-circle')}
              className={`p-3 w-full rounded-lg text-white text-lg font-semibold shadow-lg transition duration-200 ${
                activeScreen === 'screen-circle'
                  ? 'bg-primary hover:bg-indigo-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Circle Explorer
            </button>
          </div>
    )
}

export default Menu;