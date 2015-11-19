# Neighbors-Community-Manager
A community management system for easier governance and administration the common residential areas.

Server endpoints
----------------

**Each endpoint signature can be changed during development, feel free to make new additions or corrections where you think it is necessary.**
------------------------------------------------------------------------

**TIPS:** 
Add **"READY"** prefix in front of each point that is fully implemented.
Add **"WORKING"** prefix in front of each point that is currently under construction.


**I. UserController** 

 1. Create User **(POST)** - **api/user**
 2. Update User by ID - **(PUT)** - **api/user/{id}**
 3. Delete User by ID - **(DELETE)** - **api/user/{id}**
 4. Delete User by Email - **(DELETE) - api/user/{email}**
 5. Get User by ID - **(GET) - api/user/{id}**
 6. Get User by Apartment Number - **(GET) - api/user/{apartment-number}**
 6. Get all Users - **(GET) - api/user**
 7. Get all Users without the current logged user - **(GET) - api/users-available**
 8. Get all Users matching a given Name - **(GET) - api/user/{name}**
 9. Get all Users that have taxes which are not paid - **(GET) api/user/taxes-not-paid**
 10. Get all Users that have concrete tax which is not paid **(GET) api/user/taxes-not-paid/{tax-id}**
(Example: Tax - "Elevator electricity and support" -> Ivan, Gosho, Marto, Mariyan have not paid)

**II. TaxController - READY**
*Authorization: Administrator, Accountant*

 1. Create Tax - **(POST) - api/taxes** -> RequestBody *TaxRequestTransferMode.cs*
 2. Get Tax by Id - **(GET) - api/taxes/get/{id}** 
 3. Update Tax by ID - **(PUT) - api/taxes/update/{id}** -> RequestBody *TaxDataTransferMode.cs*
 4. Delete Tax by ID - **(DELETE) - api/taxes/delete/{id}** *marks as deleted*
 5. Remove Tax by ID - **(DELETE) - api/taxes/remove/{id}** *removes entity from DB*
 6. Get all Taxes - **(GET) - api/taxes** *Removed- users should not be able to get all taxes in the system*
 7. Get all Taxes by CommunityId - **(GET) - api/taxes/community/{id}**
 8. Get all Taxes which are available for payment by community ID - **(GET) - api/taxes/available/{id}**
 9. Get all Taxes which are not-available for payment (their deadline has passed) for current community - **(GET) - api/taxes/expired/{id}**
 10. Create payment for a tax or update if same user has already paid - ** (POST) - api/taxes/addpayment/{id}**
 	-> RequestBody *TaxPaymentRequestModel.cs*

**III. ProposalsController**

 1. Create Proposal - **(POST) - api/proposals** *--> RequestBody: ProposalDataTransferModel*
 2. Update Proposal by ID - **(PUT) - api/proposals/{id}** *-- N/A *
 3. Delete Proposal by ID - **(DELETE) - api/proposals/{id}** *-- N/A *
 4. Delete all Proposals by given AuthorID - **(DELETE) - api/proposals/{author-id}** *-- N/A *
 5. Get Proposal by ID - **(GET) - api/proposals/{id}** *-- N/A *
 6. Get all Proposals - **(GET) -api/proposals**
 7. Get all Proposals by ComunityId - **(GET) -api/proposals/getByCommunity/{id}**
 8. Vote for by proposal id - **(POST) -api/proposals/VoteUp/{id}**
 9. Vote against by proposal id - **(POST) -api/proposals/VoteDown/{id}**
 10. Vote neutral by proposal id - **(POST) -api/proposals/VoteNeutral/{id}**

**IV. InvitationController**
 1. Send Invitation - **(POST) - api/invitation** with Body { "email@domain.com" }
 1. Get Invitation by ID - **(GET) - api/invitation/{id}**
