data "azurerm_resource_group" "k8s_cluster_group" {
    name = var.resource_group_name
}