
import './App.css';
import axios from "axios";
import { useEffect } from 'react';
const ethers=require("ethers");


function App() {

  var contractAddress, abi,contractProvider,contractSigner, receiverAddress, name, date, course, tokenId, image, tokenURI, imageURL;
  var JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNjgyZjY0ZS1kYzUyLTQzOGEtYjgxZC0wMTRiZjdjNjJiMTYiLCJlbWFpbCI6Im1haWxha3NoaXRoZXJlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMWExZGFjNDQyYjVkMjM5MWRmMSIsInNjb3BlZEtleVNlY3JldCI6IjU0MWRmMGYyNDYxYzU1MzFjYWQyNTcxNzkzYzRkYTZkN2M2MDM0NmNkOWQ3MTRjZDA4YjkzN2U1Y2E2NWZjZDciLCJleHAiOjE3ODI5OTg4Mjh9.Rc9J9O540bUheD5blam4NhOFt-sIl4zuCCGnDH7SKMk";

  var data={
    tokenId:0,
    RecepientAddress:"",
    Name:"",
    URI:"",
    CourseName: "",
    Date:"",
    Minter:""
  }

  useEffect(()=>{

    const initializer=async()=>{

      contractAddress="0x5a0dfeA1214C3e78608Cc98b6740e590F2e1f6ab";
      abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"inputs": [
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
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"stateMutability": "nonpayable",
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
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}];

      if(!window.ethereum){
        alert("Install Metamask");
        return;
      }

      try{
        const accounts=await window.ethereum.request({method:'eth_accounts'});
        if(accounts.length===0){
          await window.ethereum.request({method:'eth_requestAccounts'});
        }

        const provider= await new ethers.BrowserProvider(window.ethereum);
        const signer= await provider.getSigner();
        contractProvider= await new ethers.Contract(contractAddress,abi, provider);
        contractSigner= await new ethers.Contract(contractAddress, abi, signer);

        // const name= await contractSigner.name();
        // console.log(name);
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

    const handleChange1=(event)=>{
	    receiverAddress=event.target.value;
      // console.log(receiverAddress);
    }

    const handleChange2=(event)=>{
	    name=event.target.value;
      // console.log(name);
    }

    const handleChange3=(event)=>{
	    course=event.target.value;
      // console.log(course);
    }

    const handleChange4=(event)=>{
	    date=event.target.value;
      // console.log(date);
    }

    const handleChange5=(event)=>{
	    tokenId=event.target.value;
      // console.log(date);
    }

	const handleChange6=(event)=>{
	    image=event.target.files[0];
      // console.log(date);
    }

    const mint=async()=>{


		try{
			if(receiverAddress==undefined|| name==undefined || course==undefined || date==undefined){
				document.querySelector(".details").innerText = "Please fill all the details";
				return;
			}
			else if (!image) {
  				document.querySelector(".details").innerText = "Please select the image";
  				return;
			}		


			const formData= new FormData(); // creating new form to store the image details.
			formData.append("file", image); // adding image data to file

			// sending request tp pinata to upload image and return the CID
			const result= await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {maxBodyLength: "Infinity",headers: {Authorization: `Bearer ${JWT}`}});

			let imageCID=`${result.data.IpfsHash}`;

			const metadata = {
    			name: `${course}`,
    			description: `${course}`,
    			image: `ipfs://${imageCID}`,
			};
			console.log(metadata.image);

			const metadataBlob = new Blob([JSON.stringify(metadata)], {type: "application/json",});
			const metadataForm = new FormData();
			metadataForm.append("file", metadataBlob, "metadata.json");

			let metadataCID;
  			const metaRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",metadataForm,{maxBodyLength: "Infinity",headers: {Authorization: `Bearer ${JWT}`}});

  			metadataCID = metaRes.data.IpfsHash;
			tokenURI=`ipfs://${metadataCID}`;
			console.log(tokenURI);


			await contractSigner.mintMyNFT(receiverAddress,name, tokenURI, course, date);
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


    const checkDetails=async()=>{
    	try{

			var currentTokenId=await contractSigner.tokenId();
			if(tokenId==undefined || tokenId==0 || tokenId>currentTokenId){
				document.querySelector(".details").innerText = "Please enter a valid token Id, token with this token Id is not minted";
				return;
			}
        	const result=await contractSigner.getNFTDetails(tokenId);

        	data.tokenId=result[0].toString();
        	data.RecepientAddress=result[1];
        	data.Name=result[2];
        	data.URI=result[3];
        	data.CourseName= result[4];
        	data.Date=result[5];
        	data.Minter=result[6];

			document.querySelector(".image").src = "";
        	document.querySelector(".details").innerText=JSON.stringify(data, null, 2);
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

	const checkImage=async()=>{
		try{
			var currentTokenId=await contractSigner.tokenId();
			if(tokenId==undefined || tokenId==0 || tokenId>currentTokenId){
				document.querySelector(".details").innerText = "Please enter a valid token Id, token with this token Id is not minted";
				return;
			}
        	const result=await contractSigner.getNFTDetails(tokenId);
			const uri=result[3];
			

			const url=uri.replace("ipfs://","https://ipfs.io/ipfs/");
			const urlData = await axios.get(url);

			imageURL= urlData.data.image.replace("ipfs://","https://ipfs.io/ipfs/");

			document.querySelector(".details").innerText = "";
			document.querySelector(".image").src = imageURL;

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

	const download=async()=>{

		try{

			if(imageURL==undefined){
				console.log("Please view the image first and then download");
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

			link.download = `nft_${tokenId}.${extension}`;
			
    		document.body.appendChild(link);
    		link.click();
    		document.body.removeChild(link);

			
  		} 
		catch (err) {
    	console.error("Download error:", err);
    	document.querySelector(".details").innerText = "Error downloading image.";
  		}
	}

    






  return (
    <div><div className="login-form">
  <h1>NFT Certificate</h1>
  <div className="form-input-material">
     <label >Mint NFT Certificate</label><br></br>
    <input type="text" placeholder="Recepient Address" onChange={handleChange1} required />
    <input type="text" placeholder="Name" onChange={handleChange2} required />
    <input type="text" placeholder="Event Name" onChange={handleChange3} required />
    <input type="text" placeholder="Date" onChange={handleChange4} required /><br></br><br></br>
    <label >Upload CertificateNFT</label><br></br>
    <input type="file" accept="image/*" onChange={handleChange6} required/>
   
  </div>
  <button className="btn btn-primary" onClick={mint}>Mint NFT</button>
  </div>

  <div className="login-form">
  <h3>Check NFT Details</h3>
  <input type="text" className="tokenId" size="20" placeholder="Token Id" onChange={handleChange5} required /><br></br>
  <button className="check" onClick={checkDetails}>check details</button> <br></br>
  <button className="check" onClick={checkImage}>check image</button>
  <div className='data'><img className="image" /><pre className="details"></pre></div>
  <button className="download"onClick={download}>Downlaod</button>
  
  

</div></div>
  );
}


export default App;
