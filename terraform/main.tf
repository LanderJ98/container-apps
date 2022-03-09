# resource "azurerm_resource_group" "node_resource_group" {
#     name = var.node_resource_group
#     location = data.azurerm_resource_group.k8s_cluster_group.location
#     tags = var.tags
# }

resource "azurerm_kubernetes_cluster" "web_cluster" {
  name                = var.k8s_cluster_name
  resource_group_name = data.azurerm_resource_group.k8s_cluster_group.name
  location            = data.azurerm_resource_group.k8s_cluster_group.location

  dns_prefix = "mywebcluster"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = var.vm_size
  }
  identity {
    type = "SystemAssigned"
  }
  automatic_channel_upgrade = "stable"
  node_resource_group       = var.node_resource_group

  linux_profile {
    admin_username = var.admin_username
    ssh_key {
      key_data = file("~/.ssh/id_rsa.pub")
    }
  }
  tags = var.tags
}
