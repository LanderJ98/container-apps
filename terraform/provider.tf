###########################################################
########## DO NOT REMOVE ANYTHING IN THIS FILE ############
###########################################################

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.97.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-weu-JosieLander"
    storage_account_name = "azjltfstate"
    container_name       = "k8s"
    key                  = "terraform.tfstate"
  }

}

provider "azurerm" {
  features {}
}
