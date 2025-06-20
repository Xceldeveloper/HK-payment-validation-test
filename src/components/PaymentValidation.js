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
        test: () => {
          return /^\d{16}$/.test(form.cardNumber);
        },
        errorTarget: "numberInput",
        errorMessage: "Invalid Card Number",
      },
      cardName: {
        regex: /^[a-zA-Z\s]+$/,
        test: () => {
          return (
            /^[a-zA-Z\s]+$/.test(form.cardName) &&
            form.cardName.trim().length > 0
          );
        },
        errorTarget: "nameInput",
        errorMessage: "Invalid Card Name",
      },
      cardExpiryMonth: {
        test: () => {
          return (
            /^(0[1-9]|1[0-2])$/.test(form.cardExpiryMonth) &&
            form.cardExpiryMonth.length === 2
          );
        },
        errorTarget: "monthInput",
        errorMessage: "Invalid Month",
      },
      cardExpiryYear: {
        test: () => {
          const currentYear = new Date().getFullYear();
          const year = parseInt(form.cardExpiryYear, 10);
          return (
            /^\d{4}$/.test(form.cardExpiryYear) &&
            year >= currentYear &&
            year <= currentYear + 3
          );
        },
        errorTarget: "yearInput",
        errorMessage: "Invalid Year",
      },
      cardCVV: {
        regex: /^\d{3}$/,
        test: () => {
          return /^\d{3}$/.test(form.cardCVV);
        },
        errorTarget: "cvvInput",
        errorMessage: "Invalid CVV",
      },
    };
  }, [form]);

  // effect validation errors
  React.useEffect(() => {
    const errorElements = document.querySelectorAll(".invalid-text");

    errorElements.forEach((el) => {
      el.innerHTML = "";
    });

    Object.keys(validations).forEach((key) => {
      const validation = validations[key];
      const errorElement = document.querySelector(
        `[data-testid="${validation.errorTarget}Error"]`
      );

      if (!errorElement) return;
      if (!validation.test()) {
        errorElement.textContent = validation.errorMessage;
      }
    });
  }, [validations]);

  const canSubmit = useMemo(() => {
    return Object.keys(validations).every((key) => validations[key].test());
  }, [validations]);

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
                  type="number"
                  value={form.cardNumber}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      cardNumber: e.target.value,
                    });
                  }}
                />
                <p className="invalid-text" data-testid="numberInputError"></p>
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
                <p className="invalid-text" data-testid="nameInputError"></p>
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
                  <p className="invalid-text" data-testid="monthInputError"></p>
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
                  <p className="invalid-text" data-testid="yearInputError"></p>
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
                  <p className="invalid-text" data-testid="cvvInputError"></p>
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
