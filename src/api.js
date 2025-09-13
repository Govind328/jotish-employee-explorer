
import axios from "axios";

const API_URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

export async function fetchTableData() {
  try {
    const body = { username: "test", password: "123456" };
    const resp = await axios.post(API_URL, body, {
      headers: { "Content-Type": "application/json" },
    });
    return resp.data;
  } catch (err) {
    console.warn(
      "⚠️ Using fallback data (API unreachable):",
      err && err.response
        ? err.response.data || err.response.statusText
        : err.message
    );

    
    return {
      Error: 0,
      Data: [
        { id: 1, employee_name: "Aman Sharma", city: "Chennai", salary: 50000, age: 29 },
        { id: 2, employee_name: "Babita Rajput", city: "Delhi", salary: 60000, age: 22 },
        { id: 3, employee_name: "Chandrakant Reddy", city: "Bengaluru", salary: 45000, age: 27 },
        { id: 4, employee_name: "Deepika Iyer", city: "Kolkata", salary: 70000, age: 35 },
        { id: 5, employee_name: "Govind Singh", city: "Mumbai", salary: 52000, age: 23 },
        { id: 6, employee_name: "Harsh Mehta", city: "Ahmedabad", salary: 65000, age: 31 },
        { id: 7, employee_name: "Ishita Bose", city: "Pune", salary: 48000, age: 26 },
        { id: 8, employee_name: "Jatin Verma", city: "Jaipur", salary: 54000, age: 28 },
        { id: 9, employee_name: "Kavya Pillai", city: "Hyderabad", salary: 73000, age: 34 },
        { id: 10, employee_name: "Lakshay Gupta", city: "Lucknow", salary: 41000, age: 25 },
        { id: 11, employee_name: "Meera Nair", city: "Chandigarh", salary: 62000, age: 30 },
        { id: 12, employee_name: "Nikhil Rathi", city: "Nagpur", salary: 56000, age: 29 },
        { id: 13, employee_name: "Oviya Rajan", city: "Coimbatore", salary: 47000, age: 24 },
        { id: 14, employee_name: "Pranav Joshi", city: "Indore", salary: 58000, age: 33 },
        { id: 15, employee_name: "Ritika Malhotra", city: "Bhopal", salary: 64000, age: 36 },
        { id: 16, employee_name: "Saurabh Yadav", city: "Kanpur", salary: 52000, age: 27 },
        { id: 17, employee_name: "Tanvi Kapoor", city: "Varanasi", salary: 45000, age: 22 },
        { id: 18, employee_name: "Uday Patil", city: "Nashik", salary: 55000, age: 28 },
        { id: 19, employee_name: "Vandana Rao", city: "Mysuru", salary: 49000, age: 31 },
        { id: 20, employee_name: "Yash Dubey", city: "Patna", salary: 60000, age: 29 },
      ],
      _note:
        "This is fallback sample data with diverse Indian employees, used because the API failed or rejected the request.",
    };
  }
}
