
import './App.css';
import axios from "axios";
import React, {useState} from "react";
import { useEffect } from 'react';
const ethers=require("ethers");


function App() {

	const [selected, setSelected] = useState('mint');  //state variable to switch between the mint and the features div

	const [selectedChain, setSelectedChain]= useState("");  //state variable to store the chain details

	const CHAINS = { // variable that stores the chain related details.
  		sepolia: {
    	chainId: '0xaa36a7',
  		chainName: 'Ethereum Sepolia',
  		rpcUrls: ['https://ethereum-sepolia.publicnode.com'],
  		blockExplorerUrls: ['https://sepolia.etherscan.io'],
  		nativeCurrency: {
    		name: 'SepoliaETH',
    		symbol: 'ETH',
    		decimals: 18,
  			}
		},
 	 	amoy: {
    		chainId: '0x13882',
    		chainName: 'Polygon Amoy',
    		rpcUrls: ['https://rpc-amoy.polygon.technology'],
    		blockExplorerUrls: ['https://www.oklink.com/amoy'],
    		nativeCurrency: {
      		name: 'MATIC',
      		symbol: 'MATIC',
      		decimals: 18,
    		},
  		},
  		base: {
    		chainId: '0x14a34',
    		chainName: 'Base Sepolia',
    		rpcUrls: ['https://sepolia.base.org'],
    		blockExplorerUrls: ['https://sepolia.basescan.org'],
    		nativeCurrency: {
      			name: 'BaseETH',
      			symbol: 'ETH',
      			decimals: 18,
    		},
  		},
	};

	const [formData, setFormData]=useState({       //state variable to store the form details
		receiverAddress:"",
		name:"",
		course:"",
		date:"",
		tokenId:"",
		issuerName:"",
		issuerAddress:"",
		issuerCompany:"",
		rate:"",
		fetchTokenId:"",
		rateTokenId:"",
		revokeTokenId:"",
		historyTokenId:""
	})


  	let contractAddress, abi,contractProvider,contractSigner, image, tokenURI, imageURL, provider, btn, chain;

	//JWT to connect with the pinata server
 	let JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNjgyZjY0ZS1kYzUyLTQzOGEtYjgxZC0wMTRiZjdjNjJiMTYiLCJlbWFpbCI6Im1haWxha3NoaXRoZXJlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMWExZGFjNDQyYjVkMjM5MWRmMSIsInNjb3BlZEtleVNlY3JldCI6IjU0MWRmMGYyNDYxYzU1MzFjYWQyNTcxNzkzYzRkYTZkN2M2MDM0NmNkOWQ3MTRjZDA4YjkzN2U1Y2E2NWZjZDciLCJleHAiOjE3ODI5OTg4Mjh9.Rc9J9O540bUheD5blam4NhOFt-sIl4zuCCGnDH7SKMk";

  useEffect(()=>{
	
    const initializer=async()=>{
	
    contractAddress="0x69a67C4c824AC31cE04377A86F447c27b4CC4eCA";
    abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AccessControlBadConfirmation",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "neededRole",
				"type": "bytes32"
			}
		],
		"name": "AccessControlUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "IssuerAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "IssuerRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "NFTMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Revoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "UnRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ISSUER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "alreadyRevoked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "expiryTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getNFTDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tokenURI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issueDate",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "issuerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "issueTime",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTCertificate.NFT",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getRating",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "issuerProfile",
		"outputs": [
			{
				"internalType": "address",
				"name": "issuerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organization",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "accessGiven",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receipentAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_courseName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issueDate",
				"type": "string"
			}
		],
		"name": "mintMyNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "rateCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			}
		],
		"name": "registerIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuerAddress",
				"type": "address"
			}
		],
		"name": "removeIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "removeRevoke",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "callerConfirmation",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "revokeCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	}
]

    // check if metamask is installed or not 
    if(await !window.ethereum){
    	alert("Install Metamask");
        return;
    }

    try{

		// getting the ethereum accounts connected to the user wallet
    	const accounts=await window.ethereum.request({method:'eth_accounts'}); 

		// if it gives no account, request to open metamask is given
    	if(accounts.length===0){
          await window.ethereum.request({method:'eth_requestAccounts'});
        }

        provider= await new ethers.BrowserProvider(window.ethereum);   // getting the provider
        const signer= await provider.getSigner();                      // getting the signer
        contractProvider= await new ethers.Contract(contractAddress,abi, provider);  // instance of smart contract to read from the chain
        contractSigner= await new ethers.Contract(contractAddress, abi, signer);    // instance of the smart contract to make changes to the blockchain state

      }
      catch(err){
        if(err.code===-32002){
          alert("Metamask is already requesting access, Open the popup.");
        }
        else{
          console.log("Connection error: ", err);
        }
      }
    }
    initializer();
  })

  	const handleChange=(event)=>{        // saving the uploaded image details to variable
	    image=event.target.files[0];
      // console.log(date);
    }

	const handleChainChange = async (e) => {   //getting the value of chain selected and set the selected chain.
    	const chainKey = e.target.value;
    	chain = CHAINS[chainKey];
    	setSelectedChain(chainKey);
		// console.log(chain);
	}

// function to change the chain into metamask wallet
	const connectWallet=async()=>{
		try {
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			await window.ethereum.request(  // request to change the chain using chainId
				{
        			method: 'wallet_switchEthereumChain',
        			params: [{ chainId: chain.chainId }],
				})
			document.querySelector(".details").innerText =(chain.chainName + " netowrk selected, please check the metamask");	
	} 
		catch (switchError) {
      		if (switchError.code === 4902) {
        		try {
          			await window.ethereum.request({
            		method: 'wallet_addEthereumChain',
            		params: [chain],
          			});
        		} 
				catch (addError) {
          			console.error('Error adding chain:', addError);
        		}
      			} else {
        			console.error('Error switching chain:', switchError);
      			}
    	}
	}

	const registerIssuer=async(e)=>{
		try{

			e.preventDefault();
			const chain = CHAINS[selectedChain];
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });  // get chain id of the current network getting used in metamsk

			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){  // if sepolia chain is not getting used in metamask then given message to change
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}
			if(formData.issuerAddress==""|| formData.issuerName=="" || formData.issuerCompany==""){
				document.querySelector(".details").innerText = "Please fill all the issuer details";
				return;
			}
			
			const tx=await contractSigner.registerIssuer(formData.issuerAddress, formData.issuerName, formData.issuerCompany);  // calling the contract fucntion to register the issuer with the details
			tx.wait();
			document.querySelector(".details").innerText = ("Issuer Added, now issuer can issue Certificates");
			
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const removeIssuer=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			if(formData.issuerAddress==""){
				document.querySelector(".details").innerText = "Please provide the user address";
				return;
			}
			const tx= await contractSigner.removeIssuer(formData.issuerAddress);  // calling function to remove the issuer details and role.
			tx.wait();
			document.querySelector(".details").innerText = ("Issuer removed.");
			
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

    const mint=async(e)=>{


		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			if (!contractSigner) { 
    			alert("Contract is still loading. Please refrest the page and try agian.");
    			return;
  			}
			if(formData.receiverAddress==""|| formData.name=="" || formData.course=="" || formData.date==""){
				document.querySelector(".details").innerText = "Please fill all the details";
				return;
			}
			else if (image=="" || image==undefined) {   //if no image is selected/ uploaded
  				document.querySelector(".details").innerText = "Please select the image";
  				return;
			}	
			
			const form= new FormData(); // creating new form to store the image details.
			form.append("file", image); // adding image data to file

			// sending request tp pinata to upload image and return the CID
			const result= await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {maxBodyLength: "Infinity",headers: {Authorization: `Bearer ${JWT}`}});

			let imageCID=`${result.data.IpfsHash}`;

			const metadata = {                         //metadata of the NFT Certificate
    			name: `${formData.course}`,
    			description: `${formData.course}`,
    			image: `ipfs://${imageCID}`,
				verified:true                         // certificate uploaded with this code, will be verified
			};
			// console.log(metadata.image);

			const metadataBlob = new Blob([JSON.stringify(metadata)], {type: "application/json",});   // saving the data to file like structure called Blob
			const metadataForm = new FormData();    // creating a formData object to send files
			metadataForm.append("file", metadataBlob, "metadata.json");  //adding the blob to the form

			let metadataCID;

			// sending request to pinata to add the data
  			const metaRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",metadataForm,{maxBodyLength: "Infinity",headers: {Authorization: `Bearer ${JWT}`}});

			// creating metadata CID and token uri to be added to the mint function
  			metadataCID = metaRes.data.IpfsHash;
			tokenURI=`ipfs://${metadataCID}`;
			// console.log(tokenURI);


			const tx=await contractSigner.mintMyNFT(formData.receiverAddress,formData.name, tokenURI, formData.course, formData.date);
			// tx.wait();
			const tokenId =Number(await contractSigner.tokenId()) + 1;
			document.querySelector(".details").innerHTML=`Your TokenId is: ${tokenId}`;

		}
		catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason==null) {
    			errorMessage = "You do not have the required Issuer Role, you can only mint once the Admin approves you with the issuer role";
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;

			
		}

	}


    const checkDetails=async(e)=>{
    	try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			var currentTokenId=await contractSigner.tokenId();
			if(formData.tokenId=="" || formData.tokenId=="" || formData.tokenId>currentTokenId){
				document.querySelector(".details").innerText = "Please enter a valid token Id, token with this token Id is not minted";
				return;
			}
        	const result=await contractSigner.getNFTDetails(formData.tokenId);

			const data={         // data variable that will store the details of the NFT certificate when fetched from chain
    			tokenId:0,
    			RecepientAddress:"",
    			Name:"",
    			URI:"",
    			CourseName: "",
    			Date:"",
    			Minter:""
  			}

        	data.tokenId=result[0].toString();
        	data.RecepientAddress=result[1];
        	data.Name=result[2];
        	data.URI=result[3];
        	data.CourseName= result[4];
        	data.Date=result[5];
        	data.Minter=result[6];
			if (document.querySelector(".downloadBtn")) {
				document.querySelector(".downloadBtn").remove();
			}
			document.querySelector(".tokenImage1").style.display = "none";
			document.querySelector(".details").innerText="";
			document.querySelector(".text3").innerText="Token Details";
        	document.querySelector(".text4").innerText=JSON.stringify(data, null, 2);
			document.querySelector(".text5").innerText="";
        	// console.log(data);
        }
      	catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
    }

	const checkImage=async(e)=>{
		try{

			e.preventDefault();
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}


			// using the sepolia API to fetch the blockchain details (doesn't depend on the network of metamask)
			const sepoliaRpc = "https://eth-sepolia.g.alchemy.com/v2/5EH58evnESFA1UjtUnbBdXJJgXG3eNY6"; // or Alchemy
			const provider = new ethers.JsonRpcProvider(sepoliaRpc);
			const contractProvider = new ethers.Contract(contractAddress, abi, provider);

			var currentTokenId=await contractProvider.tokenId();

			if(formData.tokenId=="" || formData.tokenId=="" || formData.tokenId>currentTokenId){
				document.querySelector(".details").innerText = "Please enter a valid token Id, token with this token Id is not minted";
				return;
			}
			
        	const result=await contractProvider.getNFTDetails(formData.tokenId);
			const uri=result[3];    // getting the uri of token
			

			const url=uri.replace("ipfs://","https://ipfs.io/ipfs/");  
			const urlData = await axios.get(url);  //fetching the json object using uri

			imageURL= urlData.data.image.replace("ipfs://","https://ipfs.io/ipfs/");   //from the object, get the image cid and generate the link
			// console.log(imageURL)

			document.querySelector(".text3").innerText = "This is your NFT image";
			document.querySelector(".tokenImage1").style.display = "block";
			document.querySelector(".tokenImage1").src = imageURL;
			document.querySelector(".text4").innerText = "";
			document.querySelector(".details").innerText="";

			// generating the download button
			if (!document.querySelector(".downloadBtn")) {     
    			btn = document.createElement("button");
    			btn.innerText = "Download Certificate";
    			btn.className = "downloadBtn";

    			// Optional: Add click functionality
    			btn.onclick = () => {
					download();
    			};

    			// Append button to container or wherever you want
    			document.querySelector(".info").appendChild(btn);
  			}

			const issuerAddress=result[6];
			const issuerDetails= await contractProvider.issuerProfile(issuerAddress);
			
			//fetching details for the expiry date
			document.querySelector(".text4").innerText = ("🧾 This Certificate is issued by " + issuerDetails[1] + " having address " + issuerAddress  + " and from " + issuerDetails[2] + " organization 🏛️");
			const expiryTime=Number(await contractProvider.expiryTime(formData.tokenId));
			const currentTimeInSeconds = Number(Math.floor(Date.now() / 1000));
			const expiryDate = new Date((expiryTime) * 1000);
			if(currentTimeInSeconds>expiryTime){
				document.querySelector(".text5").innerHTML = ("⛔expired on " +  expiryDate.toString());
			}
			else document.querySelector(".text5").innerHTML = ("⛔Expires on " +  expiryDate.toString());

			const isVerified=urlData.data.verified;
			if(isVerified){
				document.querySelector(".text5").innerHTML+=("<br><br>✔️Verified on Blockchain✔️");
			}
			else{
				document.querySelector(".text5").innerHTML+=("<br><br>❌Not Verified on Blockchain❌");
			}

        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const download=async(e)=>{

		try{

			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			if(imageURL==undefined){
				document.querySelector(".details").innerText = ("Please view the image first and then download");
				return;
			}

			const response = await fetch(imageURL);
    		const blob = await response.blob();

    // Guess file extension from content-type
    		const contentType = response.headers.get("content-type");
    		const extension = contentType.split("/")[1];

    // Create object URL
    		const blobURL = window.URL.createObjectURL(blob);
			
			const link = document.createElement('a');
    		link.href = blobURL;

			link.download = `nft_${formData.tokenId}.${extension}`;
			
    		document.body.appendChild(link);
    		link.click();
    		document.body.removeChild(link);

  		} 
		catch (err) {
    		console.error("Download error:", err);
    		document.querySelector(".details").innerText = "There is some error in downloading the image.";
  		}
	}

	const rateCertificate=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			if(formData.rateTokenId=="" || formData.rate==""){
				document.querySelector(".details").innerText = ("Please enter valid token id and rating from 1-5");
				return;
			}
			const tx= await contractSigner.rateCertificate(formData.rateTokenId, formData.rate);
			await tx.wait(); // wait for it to be mined
    		document.querySelector(".details").innerText = ("Rated successfully");
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const getAverageRating=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			
			if(formData.fetchTokenId==""){
				document.querySelector(".details").innerText = ("Please provide a valid token ID");
				return;
			}

			const rating=Number(await contractSigner.getRating(formData.fetchTokenId));
			// rating comes with 10**18 for easy decimal conversion
			const averageRating = rating/10**18;
			document.querySelector(".tokenImage1").style.display = "none";
			document.querySelector(".details").innerText="";
        	document.querySelector(".text3").innerText="Token's average rating is"
			document.querySelector(".text4").innerText=averageRating + "⭐";
			document.querySelector(".text5").innerHTML = "";
			const existingBtn = document.querySelector(".downloadBtn");
  			if (existingBtn) {
    			existingBtn.remove();
  			}
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const revokeToken=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}
			
			if(formData.revokeTokenId==""){
				document.querySelector(".details").innerText = ("Please provide a valid token ID");
				return;
			}
			(await contractSigner.revokeCertificate(formData.revokeTokenId));
			document.querySelector(".details").innerText = ("The Certificate has been revoked");
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason==null) {
    			errorMessage = "You do not have the required Issuer Role, you can only mint once the Admin approves you with the issuer role";
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const UnRevokeToken=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}

			
			if(formData.revokeTokenId==""){
				document.querySelector(".details").innerText = ("Please provide a valid token ID");
				return;
			}
			(await contractSigner.removeRevoke(formData.revokeTokenId));
			document.querySelector(".details").innerText = ("The Certificate has been un revoked");
        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason==null) {
    			errorMessage = "You do not have the required Issuer Role, you can only mint once the Admin approves you with the issuer role";
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const getHistory=async(e)=>{
		try{

			e.preventDefault();
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			const chain = CHAINS[selectedChain];
			const currentTokenId=await contractSigner.tokenId();
			if(chain==undefined){
				document.querySelector(".details").innerText =("Please select a chain network first");
				return;
			}
			if(chainId!="0xaa36a7"){
				document.querySelector(".details").innerText =("You need to select sepolia chain network to access this functionality");
				return;
			}
			if(formData.historyTokenId=="" || formData.historyTokenId>currentTokenId){
				document.querySelector(".details").innerText = ("Please provide a valid token ID");
				return;
			}

			const mintedFilter = contractSigner.filters.NFTMinted();  // 
			const latestBlock = await provider.getBlockNumber();   // latest block number
			const fromBlock = latestBlock-20000; // adjust as needed


			//getting event details with the filter of NFTMinted() event
			const mintedEvent = await contractSigner.queryFilter(mintedFilter, fromBlock, latestBlock);
			
			if (mintedEvent.length === 0){
				document.querySelector(".text3").innerText= "";
				document.querySelector(".text4").innerText= "";
				document.querySelector(".text5").innerText= "";
  				document.querySelector(".details").innerText = ("No events found in range.");
				} 
			else{
  				mintedEvent.forEach((event) => {
					if(Number(event.args.tokenId)==formData.historyTokenId){     // getting the event details for specifictoken id (event contain all the event details for NFTMinted())
						const date = new Date(Number(event.args.time) * 1000);   // converted time into date
						document.querySelector(".tokenImage1").style.display = "none";
						document.querySelector(".details").innerText="";
        				document.querySelector(".text3").innerText="Important Events 📨"
						document.querySelector(".text4").innerText= "📌This NFT has been Minted by " +  event.args.issuer + " at " + date.toString();
						document.querySelector(".text5").innerHTML = "";
						const existingBtn = document.querySelector(".downloadBtn");
  						if (existingBtn) {
    						existingBtn.remove();
  						}
					}
				})
			}


			// checking whether the certificate is currently revoked or not
			const status=await contractSigner.alreadyRevoked(formData.historyTokenId);
			// console.log(status);
			if(!status){
				document.querySelector(".text5").innerText= "Revoked status: NA";
				return;
			}

			//  if the certificate has been revoked then it will display the revoked time details
			const revokedFilter = contractSigner.filters.Revoked();
			const revokedEvent = await contractSigner.queryFilter(revokedFilter, fromBlock, latestBlock);
			let revokedTime;
			if (revokedEvent.length == 0){
  				document.querySelector(".details").innerText = ("No events found in range.");
				} 
			else{
  				revokedEvent.forEach((event) => {
					if(Number(event.args.tokenId)==formData.historyTokenId){
						revokedTime=event.args.time;
						// console.log(event.args);
					}
				});

				const rTime = new Date(Number(revokedTime) * 1000);
				document.querySelector(".text5").innerText=("This certificate was revoked by the issuer at " +  rTime.toString());
			}

        }
        catch(err){
			let errorMessage = "An unexpected error occurred.";

  			if (err.code === "CALL_EXCEPTION" && err.reason) {
    			errorMessage = err.reason;
  			} else if (err.info && err.info.error && err.info.error.message) {
    			errorMessage = err.info.error.message;
  			} else if (err.message) {
    			errorMessage = err.message;
  			}

  			document.querySelector(".details").innerText = errorMessage;
		}
	}

	const renderContent = () => {
    switch (selected) {
      case 'mint':
        return(
		<div className="signupSection">
			<div className="info">
            <h2 className='text1'>MINT </h2>
            <img src="1.png" className='tokenImage'></img>
            <p className='text2'>Your NFT Certificate</p>
			<p className='text5'></p>
            </div>
            <form  className="signupForm">


			
            <li><label></label><input type="text" className="inputFields"placeholder="Receiver's Address" value={formData.receiverAddress} onChange={(e)=>setFormData({...formData,receiverAddress:e.target.value})} required/></li>
            <li><label ></label><input  className="inputFields" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} required/></li>
            <li><label></label><input type="text" className="inputFields" placeholder="Event" value={formData.course} onChange={(e)=>setFormData({...formData,course:e.target.value})} required/></li>
	        <li><label></label><input type="text" className="inputFields" placeholder="date" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} required/></li>
	        <br></br>
			<input type="file" accept="image/*"  className='upload' onChange={handleChange} required/><br></br>
            <input type="button" className="join-btn"   value="Mint" onClick={mint}></input><br></br>


			<br></br>
			<input type="text" value={formData.issuerName} onChange={(e)=>setFormData({...formData,issuerName:e.target.value})} className="inputFields3" placeholder="Name" required/>   &nbsp;
			<input type="text" value={formData.issuerCompany}onChange={(e)=>setFormData({...formData,issuerCompany:e.target.value})} className="inputFields3" placeholder="Organization" required/>  &nbsp;
			<input type="text" value={formData.issuerAddress} onChange={(e)=>setFormData({...formData,issuerAddress:e.target.value})} className="inputFields3" placeholder="Issuer Address" required/>
				&nbsp;&nbsp;&nbsp;


			<div className="dropdown">
    		<button className="dropdown-button">Issuer Role ⬇</button>
    		<div className="dropdown-content">
     		<input type="button" className="join-btn"   value="Register Issuer" onClick={registerIssuer}></input>
			<input type="button" className="join-btn"   value="Remove Issuer" onClick={removeIssuer}></input>
    		</div>
  			</div>


			
		    <p className='details'></p>
            </form>
        </div>
		)
      case 'features':
        return( 
		<div className="signupSection">
			<div className="info">
            <h2 className='text3'>MINT </h2>
            <img src="1.png" className='tokenImage1'></img>
            <p className='text4'>Your NFT Certificate</p>
			<p className='text5'></p>
            </div>
            <form  className="signupForm2">
			
			
			

			<label>Get Average Rating</label>&nbsp;&nbsp;&nbsp;
			<button className='join-btn' onClick={getAverageRating}>Fetch</button>
			<input type="text" value={formData.fetchTokenId} onChange={(e)=>setFormData({...formData, fetchTokenId: e.target.value})} placeholder='Token Id' className='inputFields2'></input>
			
			<br></br>

			<label>Get Token History</label>&nbsp;&nbsp;&nbsp;
			<button className='join-btn' onClick={getHistory}>History</button>
			<input type="text" value={formData.historyTokenId} onChange={(e)=>setFormData({...formData, historyTokenId: e.target.value})} placeholder='Token Id' className='inputFields2'></input>
			<br></br>



			<button className='join-btn' onClick={revokeToken}>Revoke</button>
			<input type="text" value={formData.revokeTokenId} onChange={(e)=>setFormData({...formData, revokeTokenId: e.target.value})} placeholder='Token Id' className='inputFields2'></input>
			<button className='join-btn'onClick={UnRevokeToken}>Un Revoke</button>

			<input type="text" value={formData.rateTokenId} onChange={(e)=>setFormData({...formData, rateTokenId: e.target.value})} className="inputFields2" placeholder="TokenId" />
			<input type="button" className="join-btn"  value="Rate Token" onClick={rateCertificate}></input> 
			<input type="text" value={formData.rate} onChange={(e)=>setFormData({...formData, rate:e.target.value})} className="inputFields2" placeholder="Rate (1-5)" /><br></br>


			<input type="button" className="join-btn"  value="Details" onClick={checkDetails} ></input>
	        <input type="text" className="inputFields2" placeholder="Enter Token Id" value={formData.tokenId} onChange={(e)=>setFormData({...formData, tokenId: e.target.value})}/>
		    <button className='join-btn' onClick={checkImage}>Image</button>
			
			<p className='details'></p>
	       

		
			
			
			
			
            </form>
        </div>
		);
      default:
        return <div className="content">Welcome</div>;
    }
  };
	


    






return (
<div >
	
      <div className='nav'>
        <button className="join-btn" onClick={() => {setSelected('mint'); window.location.reload();}} >Mint</button>
        <button className="join-btn"onClick={() => setSelected('features')}>More Features</button>
      </div>
        {renderContent()}

	<div className='chain'>	
      <select value={selectedChain} onChange={handleChainChange} style={{ width: '200px', height: '40px', fontSize: '16px' }}>
        <option value="">-- Select Chain --</option>
        <option value="sepolia">Ethereum Sepolia</option>
        <option value="amoy">Polygon Amoy</option>
        <option value="base">Base Sepolia</option>
      </select>
	  <button className='join-btn' onClick={connectWallet}>Connect</button>
	</div>
</div>




);


}


export default App;
