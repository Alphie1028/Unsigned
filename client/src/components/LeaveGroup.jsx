import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';

function LeaveGroup({ isMember, removeFromGroup}) {
    return (
        <>
            {isMember && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <MDBBtn color="danger" onClick={removeFromGroup}>Remove from group</MDBBtn>
                </div>
            )}
        </>
    );
}

export default LeaveGroup;

