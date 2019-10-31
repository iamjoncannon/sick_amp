import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import { StoreProvider, Store } from './store/Store'
import ThemeManager  from './ThemeManager'
import Logger from './Logger'
const MenuBar = lazy(() => import('./Layout/MenuBar/MenuBar'))
const BottomLayout = lazy(() => import('./Layout/Bottom/BottomLayout'))
import FallBackIcon from './FallBackIcon'

ReactDOM.render(    
        <Suspense fallback={ <FallBackIcon /> }>
          <StoreProvider>
              <Logger />
              <ThemeManager>
                <MenuBar />          
                <BottomLayout />        
              </ThemeManager>
          </StoreProvider> 
        </Suspense>,
  document.getElementById("root") || document.createElement('app')
);
