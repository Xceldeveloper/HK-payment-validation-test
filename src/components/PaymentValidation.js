import React from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">XXXXXXXXXXXXXXXX</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">HOLDER NAME</span>
              <span className="debit-card-date">MM/YYYY</span>
              <span className="debit-card-cvv">CVV</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                />
                <p className="invalid-text" data-testid="numberInputError">
                  Invalid Card Number
                </p>
              </div>
              <div className="layout-column mb-15">
                <input placeholder="Name On Card" data-testid="nameInput" />
                <p className="invalid-text" data-testid="nameInputError">
                  Invalid Card Name
                </p>
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input placeholder="Expiry Month" data-testid="monthInput" />
                  <p className="invalid-text" data-testid="monthInputError">
                    Invalid Month
                  </p>
                </div>
                <div className="layout-column mb-30">
                  <input placeholder="Expiry Year" data-testid="yearInput" />
                  <p className="invalid-text" data-testid="yearInputError">
                    Invalid Year
                  </p>
                </div>
                <div className="layout-column mb-30">
                  <input placeholder="CVV" data-testid="cvvInput" />
                  <p className="invalid-text" data-testid="cvvInputError">
                    Invalid CVV
                  </p>
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={false}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
