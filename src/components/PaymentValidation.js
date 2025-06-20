import React, { useMemo } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const [form, setForm] = React.useState({
    cardNumber: "",
    cardName: "",
    cardExpiryMonth: "",
    cardExpiryYear: "",
    cardCVV: "",
  });

  const validations = useMemo(() => {
    return {
      cardNumber: {
        error: !/^\d{16}$/.test(form.cardNumber),
        errorTarget: "numberInput",
        errorMessage: "Invalid Card Number",
      },
      cardName: {
        error: !/^[a-zA-Z\s]+$/.test(form.cardName),
        errorTarget: "nameInput",
        errorMessage: "Invalid Card Name",
      },
      cardExpiryMonth: {
        error: !/^(0[1-9]|1[0-2])$/.test(form.cardExpiryMonth),
        errorTarget: "monthInput",
        errorMessage: "Invalid Month",
      },
      cardExpiryYear: {
        error: () => {
          const currentYear = new Date().getFullYear();
          const year = parseInt(form.cardExpiryYear, 10);
          return (
            !/^\d{4}$/.test(form.cardExpiryYear) ||
            year < currentYear ||
            year > currentYear + 3
          );
        },

        errorTarget: "yearInput",
        errorMessage: "Invalid Year",
      },
      cardCVV: {
        error: !/^\d{3}$/.test(form.cardCVV),
        errorTarget: "cvvInput",
        errorMessage: "Invalid CVV",
      },
    };
  }, [form]);

  const canSubmit = useMemo(() => {
    if (
      !form.cardNumber ||
      !form.cardName ||
      !form.cardExpiryMonth ||
      !form.cardExpiryYear ||
      !form.cardCVV
    ) {
      return false;
    }

    // run through validations and return true if all are valid and make sure to check type of error
    return Object.values(validations).every((validation) => {
      if (typeof validation.error === "function") {
        return !validation.error();
      }
      return !validation.error;
    });
  }, [form, validations]);

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">
              {form.cardNumber || "XXXXXXXXXXXXXXXX"}
            </p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">
                {form.cardName || "HOLDER NAME"}
              </span>
              <span className="debit-card-date">
                {form.cardExpiryMonth || "MM"}/ {form.cardExpiryYear || "YYYY"}
              </span>
              <span className="debit-card-cvv">{form.cardCVV || "CVV"}</span>
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
                  type="text"
                  value={form.cardNumber}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      cardNumber: e.target.value,
                    });
                  }}
                />
                {validations.cardNumber.error && (
                  <p className="invalid-text" data-testid="numberInputError">
                    {validations.cardNumber.errorMessage}
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  type="text"
                  value={form.cardName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      cardName: e.target.value,
                    });
                  }}
                />
                {validations.cardName.error && (
                  <p className="invalid-text" data-testid="nameInputError">
                    {validations.cardName.errorMessage}
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    type="number"
                    maxLength="2"
                    value={form.cardExpiryMonth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        cardExpiryMonth: e.target.value,
                      });
                    }}
                  />
                  {validations.cardExpiryMonth.error && (
                    <p className="invalid-text" data-testid="monthInputError">
                      {validations.cardExpiryMonth.errorMessage}
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    type="number"
                    maxLength="4"
                    value={form.cardExpiryYear}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        cardExpiryYear: e.target.value,
                      });
                    }}
                  />
                  {validations.cardExpiryYear.error() && (
                    <p className="invalid-text" data-testid="yearInputError">
                      {validations.cardExpiryYear.errorMessage}
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    placeholder="CVV"
                    data-testid="cvvInput"
                    type="number"
                    maxLength="3"
                    value={form.cardCVV}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        cardCVV: e.target.value,
                      });
                    }}
                  />
                  {validations.cardCVV.error && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      {validations.cardCVV.errorMessage}
                    </p>
                  )}
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={!canSubmit}
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
