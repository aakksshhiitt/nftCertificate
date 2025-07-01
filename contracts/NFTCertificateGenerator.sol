// SPDX-License-Identifier:MIT
pragma solidity^0.8.26;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTCertificate is ERC721, ERC721URIStorage{

// declaring the state variables
    using Strings for uint256;
    struct NFT{
        uint256 tokenId;
        address owner;
        string name;
        string tokenURI;
        string courseName;
        string issueDate;
        address issuerAddress;
    }
    uint256 tokenId;  // represents the unique token id for different NFT
    mapping(uint256 => NFT) NFTDetails;  //stores the details of NFT certificate for each token id


    constructor() ERC721("MYNFT","MN"){
        tokenId=1;
    }

// functionto mint the NFT Certificate, set the token URI for the same and store the NFT details as well.
    function mintMyNFT(address _receipentAddress, string memory _name, string memory _tokenURI, string memory _courseName, string memory _issueDate) public{
        _safeMint(_receipentAddress, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        NFT memory n= NFT(tokenId, _receipentAddress, _name, _tokenURI, _courseName, _issueDate, msg.sender);
        NFTDetails[tokenId++]=n;
    }

// function to fetch the details of the NFT Certificate for a particular tokenId.
    function getNFTDetails(uint256 _tokenId) public view returns(NFT memory){
        return NFTDetails[_tokenId];
    }


    // +++++++++++++++++ overriden functions ++++++++++++++++++ //

    function supportsInterface(bytes4 interfaceId) public view override(ERC721,ERC721URIStorage) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721,ERC721URIStorage) returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, tokenId.toString()) : "";
    }
     


}