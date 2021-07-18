import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Acordeon({title, text}) {
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{color:'#1DA3A8'}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div style={{color:'#1DA3A8',fontWeight:'bold',fontSize:16, fontFamily:'Oxygen'}}>{title}</div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{color:'#7E7E7E',fontSize:14, fontFamily:'Oxygen'}}>{text}</div>
            </AccordionDetails>
        </Accordion>
    )
}