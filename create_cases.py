import csv

employees = [
    {"employee_id": "E001", "name": "Jane Smith (Low Risk)", "role": "Senior Nurse", "department": "Emergency", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 10, "min_rest_hours_required": 11},
    {"employee_id": "E002", "name": "Mark Brown (Low Risk)", "role": "Technician", "department": "ICU", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 5, "min_rest_hours_required": 11},
    {"employee_id": "E003", "name": "John Doe (Moderate Risk)", "role": "Security Officer", "department": "Security", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 5, "min_rest_hours_required": 11},
    {"employee_id": "E004", "name": "Emily White (Moderate Risk)", "role": "Nurse", "department": "General Ward", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 2, "min_rest_hours_required": 11},
    {"employee_id": "E005", "name": "Robert Black (Moderate Risk)", "role": "Paramedic", "department": "Emergency", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 7, "min_rest_hours_required": 11},
    {"employee_id": "E006", "name": "Lisa Green (Moderate Risk)", "role": "Technician", "department": "Lab", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 3, "min_rest_hours_required": 11},
    {"employee_id": "E007", "name": "Alice Johnson (High Risk)", "role": "Paramedic", "department": "Emergency", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 36, "experience_years": 8, "min_rest_hours_required": 11},
    {"employee_id": "E008", "name": "Tom Clark (High Risk)", "role": "Security Guard", "department": "Security", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 4, "min_rest_hours_required": 11},
    {"employee_id": "E009", "name": "Sarah Connor (Critical Risk)", "role": "Charge Nurse", "department": "Emergency", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 12, "min_rest_hours_required": 11},
    {"employee_id": "E010", "name": "David Davis (Critical Risk)", "role": "Supervisor", "department": "Logistics", "employment_type": "Full-Time", "max_weekly_hours": 48, "contracted_hours": 40, "experience_years": 15, "min_rest_hours_required": 11},
]

shifts = []
shift_idx = 1

def add_shift(emp_id, date, start, end, type="Day"):
    global shift_idx
    shifts.append({
        "shift_id": f"S{shift_idx:04d}",
        "employee_id": emp_id,
        "shift_date": date,
        "shift_type": type,
        "start_time": start,
        "end_time": end,
        "location": "Main",
        "department": "Any"
    })
    shift_idx += 1

# E001 (Low: 0)
add_shift("E001", "2026-06-01", "08:00", "16:00")

# E002 (Low: 0)
add_shift("E002", "2026-06-01", "08:00", "16:00")
add_shift("E002", "2026-06-02", "08:00", "16:00")

# E003 (Moderate: 20 - max days)
for i in range(1, 8):
    add_shift("E003", f"2026-06-0{i}", "08:00", "10:00")

# E004 (Moderate: 25 - min rest)
add_shift("E004", "2026-06-01", "16:00", "00:00")
add_shift("E004", "2026-06-02", "08:00", "16:00")

# E005 (Moderate: 25 - weekly hours)
for i in range(1, 6):
    add_shift("E005", f"2026-06-0{i}", "08:00", "18:00")

# E006 (Moderate: 20 - night shifts)
for i in range(1, 5):
    add_shift("E006", f"2026-06-0{i}", "22:00", "06:00", type="Night")

# E007 (High: 65 - overlap + min rest)
add_shift("E007", "2026-06-01", "08:00", "16:00")
add_shift("E007", "2026-06-01", "10:00", "12:00")

# E008 (High: 70 - min_rest + weekly_hours + max_days)
for i in range(1, 8):
    if i == 1:
        add_shift("E008", "2026-06-01", "16:00", "00:00")
    else:
        add_shift("E008", f"2026-06-0{i}", "08:00", "16:00")

# E009 (Critical: 85 - overlap + max_days)
for i in range(1, 8):
    add_shift("E009", f"2026-06-0{i}", "08:00", "10:00")
add_shift("E009", "2026-06-07", "09:00", "11:00")

# E010 (Critical: 100 - overlap + min_rest + max_days + weekly_hours)
for i in range(1, 8):
    add_shift("E010", f"2026-06-0{i}", "08:00", "16:00")
add_shift("E010", "2026-06-07", "10:00", "12:00")

with open("data/employees.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=employees[0].keys())
    writer.writeheader()
    writer.writerows(employees)

with open("data/shifts.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=shifts[0].keys())
    writer.writeheader()
    writer.writerows(shifts)

print("Generated cases!")
