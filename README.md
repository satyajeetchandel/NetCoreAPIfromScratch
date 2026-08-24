# CRUDAPI - .NET Core REST API

A comprehensive .NET Core REST API project built from scratch, demonstrating CRUD (Create, Read, Update, Delete) operations with a clean, scalable architecture.

## 📋 Project Overview

CRUDAPI is a fully functional REST API built with ASP.NET Core that showcases best practices for building modern web APIs. The project includes proper separation of concerns with DTOs, Models, Data access layers, and well-organized Controllers.

### Language Composition
- **C#**: 32% - Backend API implementation
- **JavaScript**: 42.9% - React UI (in separate UI folder)
- **CSS**: 23.8% - UI styling
- **HTML**: 1.3% - Markup

## 🏗️ Project Structure

```
CRUDAPI/
├── Controllers/          # API endpoint controllers
├── DTOs/                # Data Transfer Objects for request/response
├── Data/                # Database context and migrations
├── Models/              # Domain models and entities
├── Program.cs           # Application startup configuration
├── appsettings.json     # Production settings
├── appsettings.Development.json  # Development settings
├── CRUDAPI.csproj       # Project configuration
├── CRUDAPI.http         # HTTP test file for API endpoints
└── CRUDAPI.csproj.user  # User-specific project settings
```

## 🚀 Getting Started

### Prerequisites
- .NET Core SDK (version compatible with the project)
- Visual Studio or Visual Studio Code
- SQL Server or configured database

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/satyajeetchandel/NetCoreAPIfromScratch.git
   cd NetCoreAPIfromScratch/CRUDAPI
   ```

2. **Restore Dependencies**
   ```bash
   dotnet restore
   ```

3. **Configure Database**
   - Update connection strings in `appsettings.json`
   - Run migrations:
   ```bash
   dotnet ef database update
   ```

4. **Run the Application**
   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:5001` (or configured port)

## 📁 Directory Descriptions

### Controllers
Handles HTTP requests and responses. Contains endpoints for CRUD operations on various resources.

### DTOs (Data Transfer Objects)
Defines request and response models. Used for data validation and API contracts, keeping domain models separate from API communication.

### Data
Contains the Entity Framework DbContext and database configurations. Manages data access and database operations.

### Models
Domain entities representing the core business objects of the application.

## 🧪 Testing API Endpoints

Use the included `CRUDAPI.http` file to test API endpoints:

```http
### Example GET request
GET https://localhost:5001/api/[resource]

### Example POST request
POST https://localhost:5001/api/[resource]
Content-Type: application/json

{
  "property": "value"
}
```

You can also use:
- **Postman** - Import the HTTP file or create requests manually
- **VS Code REST Client** - Install the extension and run requests directly
- **curl** - Command-line HTTP requests

## ⚙️ Configuration

### appsettings.json
Main configuration file containing:
- Database connection strings
- Logging levels
- API-specific settings

### appsettings.Development.json
Development-specific overrides for debugging and local testing.

## 🔧 Building & Deployment

### Build the Project
```bash
dotnet build
```

### Publish for Production
```bash
dotnet publish -c Release -o ./publish
```

### Run Published Version
```bash
dotnet CRUDAPI.dll
```

## 📚 API Endpoints

The API follows RESTful conventions:

- `GET /api/[resource]` - Retrieve all items
- `GET /api/[resource]/{id}` - Retrieve specific item
- `POST /api/[resource]` - Create new item
- `PUT /api/[resource]/{id}` - Update existing item
- `DELETE /api/[resource]/{id}` - Delete item

## 🛠️ Technologies Used

- **Framework**: ASP.NET Core
- **Language**: C#
- **ORM**: Entity Framework Core
- **Database**: SQL Server (configurable)
- **Frontend**: React (separate UI folder)

## 📝 Key Features

✅ RESTful API Design  
✅ CRUD Operations  
✅ Entity Framework Integration  
✅ DTOs for API Contracts  
✅ Dependency Injection  
✅ Configuration Management  
✅ Error Handling  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or suggestions, please open an issue on the [GitHub repository](https://github.com/satyajeetchandel/NetCoreAPIfromScratch).
