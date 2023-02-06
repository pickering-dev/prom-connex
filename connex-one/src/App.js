import React, { Component, useState, useEffect } from "react";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiResponse: "",
			serverTime: 0, // initial value for serverTime
			clientTime: "",
			difference: 0,
			loading: true,
			loadingTime: new Date().getTime(),
			theme: "dark", // set the initial theme to dark
		};
	}

	callAPI() {
		this.setState({ loading: true }); // display the loading screench
		fetch("http://localhost:9000/metrics", {
			timeout: 3000, // set a timeout of 3 seconds
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.text();
			})
			.then((res) => {
				this.setState({ apiResponse: res, loading: false });
				const serverDate = new Date(res);
				this.setState({ serverTime: serverDate.getTime() });
			})
			.catch((error) => {
				console.error(error);
				this.setState({ loading: false });
			});
	}

	componentDidMount() {
		setInterval(() => {
			fetch("http://localhost:9000/metrics", { timeout: 3000 })
				.then((res) => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.text();
				})
				.then((res) => {
					// Extract the process start time from the Prometheus text format response
					const processStartTimeSeconds =
						/process_start_time_seconds ([\d.]+)/.exec(res)[1];
					this.setState({ processStartTimeSeconds });
				})
				.catch((error) => {
					console.error(error);
					this.setState({ loading: false });
				});
			this.callAPI();
			this.setState({
				clientTime: new Date().toLocaleTimeString(),
			});

			this.setState({
				clientTime: new Date().toLocaleTimeString(),
				difference: this.state.difference + 1000,
			});
		}, 1000);
	}

	// Dark mode toggle
	toggleTheme = () => {
		this.setState({
			theme: this.state.theme === "light" ? "dark" : "light",
		});
	};

	//  Format 'difference' to display as HH:MM:SS:MS
	formatStopwatch(ms) {
		if (isNaN(ms)) return "--";

		const hours = Math.floor(ms / 3600000);
		ms %= 3600000;
		const minutes = Math.floor(ms / 60000);
		ms %= 60000;
		const seconds = Math.floor(ms / 1000);
		ms %= 1000;
		const milliseconds = ms;

		return `${hours}:${minutes}:${seconds}:${milliseconds}`;
	}

	render() {
		const currentTime = new Date().getTime();
		const loadingTime = this.state.loadingTime;
		const elapsedTime = currentTime - loadingTime;

		// Loading screen based on time taken to fetch data
		if (this.state.loading && elapsedTime < 3000) {
			return <div className="loading">Loading...</div>;
		}

		return (
			<div className={`columns ${this.state.theme}`}>
				<div className="container">
					<div className="Dm-container">
						<div className="Top-content">
							<h1>Timings</h1>
							<ul>
								<li>
									<a href="https://github.com/siimon/prom-client">GitHub</a>
								</li>
								<li>
									<a href="https://github.com/siimon/prom-client">
										Download README
									</a>
								</li>
							</ul>
						</div>

						<div className="Dm-container-vert">
							<button onClick={this.toggleTheme}>
								🌛<div className="hidden">dark mode</div>
							</button>
						</div>
					</div>
					{/* Most recent timings */}
					<div className="Content-wrapper">
						<div className="Timings">
							<div className="Server-time">
								<h2 className="App-title">Most Recent Server Time:</h2>
								<p>{this.state.processStartTimeSeconds}</p>
							</div>
							<div className="Client-time">
								<h2 className="App-title">Client Time:</h2>
								<p className="App-intro"> {this.state.clientTime}</p>
							</div>
							<div className="Difference">
								<h2 className="App-title">Difference:</h2>
								<div className="App-intro">
									<p className="App-intro">
										{this.formatStopwatch(parseInt(this.state.difference))}
									</p>
								</div>
							</div>
						</div>
						<div className="Metric-response">
							<pre className="App-response">{this.state.apiResponse}</pre>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
