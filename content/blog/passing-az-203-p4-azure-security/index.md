---
title: "Passing the AZ-203 exam - Part 4"
date: "2020-05-07T10:36:00.000Z"
description: "Azure Security - Study Guide"
---
## *Azure Security*
---

 This is Part 4 of the [AZ-203 study guide](../passing-az-203-exam/). In this post we'll cover:

- [Service Principal](#service-principal)
- [Read KeyVault secrets from C#](#read-keyvault-secrets-from-c)
- [Storage Accounts & MSI](#storage-accounts-msi)
- [Dynamic Data Masking](#dynamic-data-masking)
- [Always Encrypted](#always-encrypted)
- [Secure Access to an AKS Cluster](#secure-access-to-an-aks-cluster)
---

### Service Principal

A service principal is a non-human based identity in Azure Active Directory (AD). It can be an application, a service, or an azure resource like a VM.

### Read KeyVault secrets from C#

``` c#
private static async Task RunAsync()
{
    var astp = new AzureServiceTokenProvider();
    // Uses the login from the cli
    var kvc = new KeyVaultClient(
      new KeyVaultClient.AuthenticationCallback(
        astp.KeyVaultTokenCallback
      )
    );
    var kvBaseUrl = "https://mysecrets.vault.azure.net";
    var secret = await kvc.GetSecretAsync(
      kvBaseUrl,
      "connection-string-goes-here"
    )
}
```

### Storage Accounts & MSI

``` c#
private static async Task RunAsync()
{
    var astp = new AzureServiceTokenProvider();
    
    // ⚠️ Important to know for the exam 
    var tokenCredential = new TokenCredential(
      await astp.GetAccessTokenAsync("https://storage.azure.com")
    );

    var storageCredentials = new StorageCredentials(tokenCredential);
    
    //...
}
```

### Dynamic Data Masking

💡 DDM is good for "masking" parts of data from users not logged in to the application (also known as "public" or "excluded"). 

💡 You need the schema, table and column of a database to configure it. 

💡 Pay attention to **SuffixSize** and **PrefixSize** as they will specify the number of characters that will <span style="text-decoration: underline">NOT</span> be masked. To hide the rest of the characters, you must specify a **ReplacementString** with the length of the string minus the Suffix/Prefix size.

```powershell
New-AzureRmSqlDatabaseDataMaskingRole
  -ServerName $serverName
  -DatabaseName $databaseName
  -ResourceGroupName $resourceGroupName
  -SchemaName "dbo"
  -MaskingFunction Text
  -Tablename "Users"
  -ColumnName "AccountCode"
  -SuffixSize 2   #only last 2 characters will be shown
  -ReplacementString  # "xxxxxxx45"
```

### Always Encrypted

Always Encrypted prevents admins from seeing sensitive data. 

1. Column certs should be in Key Vault
2. Encrypt column with certificate
3. Set ```Column Encryption Setting = true ```in the database connection
4. Add an identity to the web app
5. Grant that app/identity access to the certificate in Key Vault

### Secure Access to an AKS Cluster

TODO: Add diagram

1. Create a Service Principal (SP) in Azure Active Directory, or AAD (representing the admin of the cluster)
2. Map user to a ```ClusterRoleBinding``` role inside of the AKS cluster
3. Create a SP for the cluster client
4. Create an AKS cluster

 ```bash
 # ⚠️ How do you secure the AKS cluster?  

 Map a service principal into a ClusterRoleBinding
 ```

## Next up...

Go to Part 5 of the series on [Monitoring Azure Solutions](../passing-az-203-p5-monitor-azure-solutions)