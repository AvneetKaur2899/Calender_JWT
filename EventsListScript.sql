USE [CalenderDB]
GO

/****** Object:  Table [dbo].[EventsList]    Script Date: 26-04-2021 18:43:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EventsList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [varchar](255) NULL,
	[Date] [varchar](255) NULL,
	[Country] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


