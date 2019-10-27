import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import BottomLayout from './Layout/Bottom/BottomLayout'

const App = lazy(() => import("./components/app"))

ReactDOM.render(    
        <Suspense fallback="Loading...">
            <BottomLayout />
        </Suspense>,
  document.getElementById("root") || document.createElement('app')
);
