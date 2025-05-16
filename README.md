**<div>Project Name</div>**

Mai Tech Task Manager.

***<div>Important Note:</div>***
It's hosted on render and would need a little while to restart the server

**<div>Description</div>**
This is an internal tool to help teams manage tasks, set deadlines, assign
responsibilities, and monitor project progress in real time. This web-based system supports both admin
and team member roles.

**<div>Tech Stack</div>**
<div>Backend 👨🏾‍💻</div>
    - Node and Express
<div>Database 🫙</div>
    - Mongodb for database and mongoose for querying

<!-- **Prerequisites**
2. Frontend Features: Overview of frontend features and how to use them.
1. Database Schema: Description of the database schema, including tables and relationships.
2. Security Measures: Overview of security measures implemented in the project.
3. Testing: Information on how to run tests and ensure the project is working correctly.
4. Deployment: Instructions on how to deploy the project to a production environment. -->

**<div>API Endpoints</div>**
<div>Methods are used are in italics</div>
- ('/login') *POST*: This is a POST request that takes in two arguements: name and password, to log in users.
- ('/register') *POST*: This is a POST request that takes in three arguements: name, email and password to register in users. Note: that the role is set by default to user and would 
- ('/user') *GET*: This is a GET request thats retrieves all users with their tasks, removes passwords, and returns the user objects.
- ('/usertask') *GET*: This is a GET request that returns users names, ids and the number of tasks assigned to each user.
<!-- ('/user', tasksPerStatus): -->
- ('/tasks') *GET*: This a GET request that retrieves all tasks with their assigned users, removes passwords from user objects, and returns the task objects.
- ('/tasks/:userId') *GET*: This a GET request that retrieves tasks assigned to a specific user.
- ('/tasks') *POST*: This a POST request that Creates a new task and assigns it to specified users.
<!-- ('/manytasks', setManyTasks)-->
- ('/tasks/:id') *PUT*: Updates a task with specified changes.
- ('/tasks/:id') *DELETE*: Deletes a task by ID


**<div>Test points</div>**
<div>Simple Usage Examples:</div>
- Pay Bills: Settle outstanding financial obligations to vendors, suppliers, or service providers by paying invoices, dues, or other liabilities on time.
- HR Interview: A meeting between a job candidate and a representative of the hiring company to assess the candidate's qualifications, experience, and fit for a specific role within the organization.
- Restock Shop: Replenish inventory levels in a retail store or shop by ordering and receiving new stock, organizing merchandise, and ensuring adequate supply to meet customer demand.
- Managing Customer Relationships: Responding to customer inquiries, resolving issues, and building strong relationships.
- Data Analysis: Collecting, analyzing, and interpreting data to inform business decisions.
- Marketing Campaigns: Developing and executing marketing strategies to reach target audiences.
- Financial Planning: Creating and managing budgets, forecasts, and financial reports.
- Project Management: Planning, executing, and monitoring projects to meet deadlines and goals.
- Inventory Management: Overseeing the flow of goods, products, or materials into and out of a business.
- Team Leadership: Guiding, motivating, and developing a team to achieve business objectives.
- Market Research: Conducting research to understand market trends, customer needs, and competitor activity.
- Supply Chain Management: Managing the flow of goods, services, and information from raw materials to end customers.
- Sales Strategy Development: Creating and implementing sales strategies to meet revenue targets and expand customer base.


