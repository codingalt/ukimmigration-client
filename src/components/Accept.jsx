import React from 'react'
import { useGetPhaseNotificationQuery } from '../services/api/userApi'

const Accept = () => {
    const {data, error} = useGetPhaseNotificationQuery();
    console.log(data);
  return (
    <div>
      <h1>New Application Requests</h1>
      <ul>
        {data?.phases?.map(
          (item, index) =>
            item.phase === 1 && (
              <li key={index} style={{ marginBottom: "20px" }}>
                <p>{item.name}</p>
                <p>Request for visa approval</p>
                <button
                  style={{
                    marginLeft: "20px",
                    width: "8rem",
                    height: "2.5rem",
                  }}
                >
                  Accept
                </button>
                <button
                  style={{
                    marginLeft: "20px",
                    width: "8rem",
                    height: "2.5rem",
                  }}
                >
                  Decline
                </button>
              </li>
            )
        )}
      </ul>
      <h1>Ongoing Application Request</h1>
      <ul>
        {data?.phases?.map(
          (item, index) =>
            item.phase > 1 && (
              <li key={index} style={{ marginBottom: "20px" }}>
                <p>{item.name}</p>
                <p>Request for visa approval</p>
                <button
                  style={{
                    marginLeft: "20px",
                    width: "8rem",
                    height: "2.5rem",
                  }}
                >
                  Accept
                </button>
                <button
                  style={{
                    marginLeft: "20px",
                    width: "8rem",
                    height: "2.5rem",
                  }}
                >
                  Decline
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Accept