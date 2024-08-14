# GeneratorApi - Internship 2024 Project

This project is an Angular and .NET-based REST API developed during my internship in 2024.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Create a Development Configuration File](#1-create-a-development-configuration-file)
  - [2. Install .NET SDK](#2-install-net-sdk)
  - [3. Ensure npm is Installed](#3-ensure-npm-is-installed)
  - [4. Run the Application](#4-run-the-application)

## Introduction

GeneratorApi is a REST API built using Angular for the frontend and .NET for the backend. The API provides services for generating customized emails and letters based on predefined variables. This project is designed to streamline the creation and management of personalized communications.

## Prerequisites

Before running the project, ensure you have the following installed:

- [.NET SDK 6.0.133](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [Node.js and npm](https://www.npmjs.com/get-npm)

## Setup Instructions

### 1. Create a Development Configuration File

In the root directory of the project (where `appsettings.json` is located), create a file named `appsettings.Development.json`. Paste the following configuration into this file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.AspNetCore.SpaProxy": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "server=your_server_name; database=your_database_name; Trusted_connection=True; encrypt=false"
  },
  "JwtSettings": {
    "securityKey": "generate a key",
    "validAudience": "your localhost angular address",
    "validIssuer": "your localhost .net address"
  },
  "AesSettings": {
    "key": "generate an AES key",
    "iv": "the IV generated with the key"
  }
}
```

- **ConnectionStrings**: Update with your server name and database name.
- **JwtSettings**: Replace with your security key, Angular address, and .NET address.
- **AesSettings**: Provide your AES key and initialization vector (IV).

### 2. Install .NET SDK

Make sure you have the .NET SDK 6.0.133 installed. You can download it from the official website:

[Download .NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

### 3. Ensure npm is Installed

Verify that npm (Node Package Manager) is installed on your machine. If it is not installed, you can install it from the [official website](https://www.npmjs.com/get-npm).

### 4. Run the Application

Navigate to the project directory in your terminal or command prompt and use one of the following commands to start the application:

```bash
dotnet watch run
```

or

```bash
dotnet run
```
