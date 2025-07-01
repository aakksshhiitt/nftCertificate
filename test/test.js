const {expect} = require("chai");

describe("NFTCertificate", function(){

    let contract, deployedContract,testDetails

    beforeEach(async function(){
        [admin, user1]= await ethers.getSigners();
        contract= await ethers.getContractFactory("NFTCertificate");
        deployedContract= await contract.deploy();

         await deployedContract.connect(admin).mintMyNFT(user1, "Akshit", "", "Test Certificate", "01/07/2025");
        testDetails= await deployedContract.getNFTDetails(1);

    })

    it("NFT details are added correctly", async function(){
       
        // console.log(testDetails);
        expect(testDetails[0]).to.equal(1);
        expect(testDetails[1]).to.equal(user1.address);
        expect(testDetails[2]).to.equal("Akshit");
        expect(testDetails[3]).to.equal("");
        expect(testDetails[4]).to.equal("Test Certificate");
        expect(testDetails[5]).to.equal("01/07/2025");
        expect(testDetails[6]).to.equal(admin.address);
    })

    it("NFT Certificate is transferred to the user", async function(){
        expect(await deployedContract.balanceOf(user1)).to.equal(1);
    })

    it("Contract name is saved correctly", async function(){

        expect(await deployedContract.name()).to.equal("MYNFT");
    })

    
})