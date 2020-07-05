---
title: "Passing the AZ-203 exam - *Part 2*"
date: "2019-04-13T08:24:00.000Z"
description: "Develop Azure Platform as a Service Compute Solutions - Study Guide"
---
## *Develop Azure Platform as a Service Compute Solutions*
---


This is the 2nd module measured in the AZ-203 exam.

## App Service Web Apps

*[Create a resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-create)*
```bash
az group create -n "my-rg-apps" -l westus
````

*[Create an App Service plan](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest)*
```bash
appservice plan create              
    -n "githubdeployplan"
    -g "rg-apps"
    --sku FREE         # {B1, B2, B3, D1, F1, FREE, I1, I2...
    --is-linux
````


*[Create a web app](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az-webapp-create)*

```bash
az webapp create
    -n "myapp"
    -g "rg-apps"
    --plan "githubdeployplan"
    --deployment-container-image-name "microsoft/dotnet-samples:aspnetapp"
```

## Mobile Apps

### [Enabling offline sync for a mobile app](https://docs.microsoft.com/en-us/azure/app-service-mobile/app-service-mobile-offline-data-sync)

```c#
public async Task SyncAsync()
{
    try {
        await client.SyncContext.PushAsync();  // ⚠️ 
        // Reconcile local <-> server
        await todoTable.PullAsync(             // ⚠️ 
            "allTodoItems",
            this.todoTable.CreateQuery());
    }
    catch (MobileServicePushFailedException ex){
        if (ex.PushResult != null) {
            syncErrors = ex.PushResult.Errors.
        }
    }

}
```

## Azure Functions

```c#
// ⚠️ Functions with a [QueueTrigger] attribute process Storage Queues messages

// ⚠️ Functions with a [Table] attribute will output to a Storage Table.

[FunctionName("ProcessOrders")]
public static void ProcessOrders(
    
    [QueueTrigger("incoming-orders"),
                  Connection = "AzureWebJobsStorage"]
    CloudQueueMessage queueItem,
    
    [Table("Orders",           
           Connection = "AzureWebJobsStorage")]
    ICollector <Order> tableBindings,
    ILogger log)
{
    //... 
```

💡 If a function throws an exception it will be called a maximum of 4 additional retries.

💡 Azure Functions runtime will receive up to *16* messages and run functions for each in parallel.

💡 When the number being processed gets down to 8, the runtime gets another batch of 16 messages.

📖 More info: [Azure Queue storage trigger for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-trigger?tabs=csharp)