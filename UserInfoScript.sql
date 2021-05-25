USE [CalenderDB]
GO

/****** Object:  Table [dbo].[UserInfo]    Script Date: 26-04-2021 18:48:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserInfo](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](250) NULL,
	[EmailId] [nvarchar](250) NOT NULL,
	[Password] [nvarchar](250) NULL,
 CONSTRAINT [PK_UserInfo] PRIMARY KEY CLUSTERED 
(
	[EmailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


