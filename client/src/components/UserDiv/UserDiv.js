import React from 'react'

function UserDiv(props) {
    return (
        <div id="user" className="container-fluid">
            <h5>{props.userInfo.firstName} {props.userInfo.lastName}</h5>
            <hr></hr>
            <div className="media d-flex align-items-center">
                {props.userInfo.image ? (
                    <img className="rounded-circle mr-3"
                        src={props.userInfo.image}
                        alt="User"
                    />
                ) : (
                        <i className="large material-icons" style={{ fontSize: 80 }}>account_circle</i>
                    )}
                <div className="media-body">
                    <p>Age: {props.age}</p>
                    <p>Weight: {props.userInfo.weight}</p>
                    <p>Gym: {props.userInfo.program}</p>
                    {props.stats ? (
                        <div>
                            <p>Workouts: {props.stats.countWorkout}</p>
                            <p>Minutes:{props.stats.sumMinutes}</p>
                        </div>
                    ) : ("")
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDiv

