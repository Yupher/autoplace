import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";

const AddVehicle = (props) => {
  return (
    <div className='container'>
      <div className='col-10 mr-0 ml-5'>
        <div className='card'>
          <div className='card-header'>
            <h5>Add a product</h5>
          </div>
          <div className='card-divider' />
          <div className='card-body card-body--padding-2'>vehicle form</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authState.user,
  loading: state.loadingState.loading,
});

export default connect(mapStateToProps)(AddVehicle);
