---
title: "Passing the AZ-203 exam - Part 2"
date: "2020-04-15T08:24:00.000Z"
description: "Develop Azure Platform as a Service Compute Solutions - Study Guide"
---
## *Develop Azure Platform as a Service Compute Solutions*
---

 This is Part 2 of the [AZ-203 study guide](../passing-az-203-exam/). In this post we'll cover:

- [App Service Web Apps](#app-service-web-apps)
- [Mobile Apps](#mobile-apps)
- [Azure Functions](#azure-functions)
---

This is the 2nd module measured in the AZ-203 exam.

## App Service Web Apps

*Create a resource group*
```bash
az group create -n "my-rg-apps" -l westus
````

*[az group create](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az-group-create)*

*Create an App Service plan*
```bash
appservice plan create              
    -n "githubdeployplan"
    -g "rg-apps"
    --sku FREE         # {B1, B2, B3, D1, F1, FREE, I1, I2...
    --is-linux
````

[az appservice plan](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest)

*Create a web app*

```bash
az webapp create
    -n "myapp"
    -g "rg-apps"
    --plan "githubdeployplan"
    --deployment-container-image-name "microsoft/dotnet-samples:aspnetapp"
```

[az webapp create reference](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az-webapp-create)

## Mobile Apps

### Enabling offline sync for a mobile app

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

📖 Further reading: [Offline Data Sync in Azure Mobile Apps](https://docs.microsoft.com/en-us/azure/app-service-mobile/app-service-mobile-offline-data-sync)

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

📖 Further reading: [Azure Queue storage trigger for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-trigger?tabs=csharp)


## Next up...

Go to Part 3 of the series for [Developing for Azure Storage](../passing-az-203-p3-azure-storage)