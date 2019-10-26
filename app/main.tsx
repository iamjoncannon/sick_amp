import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import PlayListDND from './Layout/Bottom/BottomLayout'

const App = lazy(() => import("./components/app"))

ReactDOM.render(    
        <Suspense fallback="Loading...">
            <PlayListDND />
        </Suspense>,
  document.getElementById("root") || document.createElement('app')
);
