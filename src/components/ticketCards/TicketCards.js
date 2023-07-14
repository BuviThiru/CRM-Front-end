
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const TicketCard = (props) =>{ 
 
    return (     
        <>
        <div className={"card bg-" + props.cardColor} style={{width: 13+"rem"}} >  
            <div className="card-body">
                <h5 className="card-title">{props.cardTitle}</h5>
                <hr />
                <div className="row">
                    <div className="col" >
                        <h1>{props.numberOfTickets}</h1>
                    </div>
                    <div className="col">
                        <div style={{ width: 50, height: 50 }}>
                            <CircularProgressbar value={props.percentage} text={`${parseInt(props.percentage)}%`} styles={buildStyles({
                                    textColor: 'black',
                                    pathColor: 'white',
                                    trailColor: 'black',
                                })}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </>
        
    )
}


export default TicketCard;