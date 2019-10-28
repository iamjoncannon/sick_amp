import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import { StoreProvider, Store } from './store/Store'
import ThemeManager  from './store/ThemeManager'

import MenuBar from './Layout/MenuBar/MenuBar'
import BottomLayout from './Layout/Bottom/BottomLayout'

const App = lazy(() => import("./components/app"))

ReactDOM.render(    
        <Suspense fallback="Loading...">
          <StoreProvider>
            <ThemeManager>

              <MenuBar />
              
              <BottomLayout />
            
            </ThemeManager>
          </StoreProvider>
        </Suspense>,
  document.getElementById("root") || document.createElement('app')
);
