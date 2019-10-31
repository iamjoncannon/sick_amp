import React from 'react';
import { Store } from '../../store/Store'
import styled from 'styled-components'
import BPMSlider from './BPMSlider'
import HarmonicMixingFilter from './HarmonicMixingFilter'

const ToolKit = () => {
    
    return (
        <>
            <BPMSlider />
            <HarmonicMixingFilter />

        </>
    )
}

export default ToolKit