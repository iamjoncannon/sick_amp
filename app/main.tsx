import React from 'react';
const Suspense = (React as any).Suspense;
const lazy = (React as any).lazy;
import ReactDOM from "react-dom";
import { StoreProvider, Store } from './store/Store'
import ThemeManager  from './store/ThemeManager'
const MenuBar = lazy(() => import('./Layout/MenuBar/MenuBar'))
const BottomLayout = lazy(() => import('./Layout/Bottom/BottomLayout'))

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
