import { Component, ChangeEvent, FormEvent } from "react";
import { FormData } from "./value";

class FormValue extends Component<{}, FormData> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      empCode:0,
      date: "",
      time: "",
      session: "",
      submittedDate: null,
    };
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTimeChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const hour = parseInt(value.split(":")[0]);
    const session = hour >= 12 ? "PM" : "AM";
    const time = value.slice(0, 5);
    this.setState({ time, session });
  }

  handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    this.setState({ date: value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState({
      submittedDate: this.state.date,
    });
  }

  render() {
    const { name, empCode, date, submittedDate, time, session } = this.state;

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      const dateObj = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = days[dateObj.getDay()];
      return ` ${day}/${month}/${year} (${day}) (${dayOfWeek})`;
    };

    const Day = (dateString: string) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      const dateObj = new Date(dateString);
      const monthday = dateObj.toLocaleString("default", { month: "long" });

      return `${month}/${day}/${year} (${month}) (${monthday})`;
    };

    const Year = (dateString: string) => {
      if (!dateString) return "";
      const [year] = dateString.split("-");
      const parsedYear = parseInt(year);
      if (
        (parsedYear % 4 === 0 && parsedYear % 100 !== 0) ||
        parsedYear % 400 === 0
      ) {
        return `${year} (Leap Year)`;
      } else {
        return `${year} (Not a Leap Year)`;
      }
    };
    const formattedTime = time ? `${time} ${session}` : " ";

    return (
      <div className="container mt-5">
        <div className="fields card border-0 shadow-lg container col-md-8 rounded-pill">
          <h2 className="text-center mt-3 text-info fw-bold">Small Task</h2>
          <form
            onSubmit={this.handleSubmit}
            className="container col-md-7 mt-5 mb-5"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bolder">
                Name
                <span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control "
                id="name"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bolder">
                EmpCode
                <span className="text-danger"> *</span>
              </label>
              <input
                type="number"
                className="form-control "
                id="name"
                value={empCode}
                onChange={(e) => this.setState({ empCode: parseInt (e.target.value) })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="date">
                Date<span className="text-danger"> *</span>
              </label>
              <input
                type="date"
                className="form-control "
                id="date"
                value={date}
                onChange={this.handleDateChange}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label fw-bold">
                Time<span className="text-danger"> *</span>
              </label>
              <input
                type="time"
                className="form-control "
                id="time"
                value={time}
                onChange={this.handleTimeChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="container">
          {submittedDate && (
            <table className="shadow-lg container mt-3 table table-striped table-bordered table-responsive">
              <thead>
                <tr>
                  <th>Name:</th>
                  <th>EmpCode:</th>
                  <th>Date:</th>
                  <th>Month:</th>
                  <th>Year:</th>
                  <th>Time:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>{empCode}</td>
                  <td>{formatDate(date)}</td>
                  <td>{Day(date)}</td>
                  <td>{Year(date)}</td>
                  <td>{formattedTime}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default FormValue;
